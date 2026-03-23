"use client";

import React, { useState } from "react";
import { LockIcon, UnlockIcon } from "./Icons";

interface AdminLoginProps {
  isAdmin: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

export default function AdminLogin({ isAdmin, onLoginSuccess, onLogout }: AdminLoginProps) {
  const [showModal, setShowModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [pin, setPin] = useState("");
  const [clearPin, setClearPin] = useState("");
  const [error, setError] = useState("");
  const [clearError, setClearError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);

  const handleLogin = async () => {
    if (!pin.trim()) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (res.ok) {
        localStorage.setItem("isAdmin", "true");
        onLoginSuccess();
        setShowModal(false);
        setPin("");
      } else {
        const data = await res.json();
        setError(data.error || "Mã PIN không đúng");
      }
    } catch {
      setError("Lỗi kết nối");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    localStorage.removeItem("isAdmin");
    onLogout();
  };

  const handleClearData = async () => {
    if (!clearPin.trim()) return;
    setIsLoading(true);
    setClearError("");

    try {
      const res = await fetch("/api/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: clearPin }),
      });

      if (res.ok) {
        setClearSuccess(true);
        setClearPin("");
        setTimeout(() => {
          setClearSuccess(false);
          setShowClearModal(false);
          window.location.reload();
        }, 1500);
      } else {
        const data = await res.json();
        setClearError(data.error || "Mã PIN không đúng");
      }
    } catch {
      setClearError("Lỗi kết nối");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="py-6 text-center">
      {isAdmin ? (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <UnlockIcon size={14} /> Admin Mode
          </span>
          <button
            onClick={() => setShowClearModal(true)}
            className="text-xs text-red-500 underline font-medium"
            style={{ touchAction: "manipulation" }}
          >
            Xóa dữ liệu
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 underline"
            style={{ touchAction: "manipulation" }}
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
          style={{ touchAction: "manipulation" }}
        >
          Đăng nhập
        </button>
      )}

      {/* Login Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "360px", borderRadius: "20px", padding: "24px" }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 justify-center">
              <LockIcon size={20} /> Đăng nhập Admin
            </h3>
            <input
              type="password"
              className="form-input mb-3"
              placeholder="Nhập mã PIN..."
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-500 mb-3">{error}</p>
            )}
            <button
              className="btn-primary"
              onClick={handleLogin}
              disabled={isLoading || !pin.trim()}
            >
              {isLoading ? "Đang xác thực..." : "Đăng nhập"}
            </button>
          </div>
        </div>
      )}

      {/* Clear Data Modal */}
      {showClearModal && (
        <div className="modal-overlay" onClick={() => setShowClearModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "360px", borderRadius: "20px", padding: "24px" }}
          >
            {clearSuccess ? (
              <div className="py-6 text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-base font-semibold text-green-600">Đã xóa toàn bộ dữ liệu!</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-red-600 mb-2 text-center">
                  Xóa toàn bộ dữ liệu
                </h3>
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Hành động này sẽ xóa tất cả danh sách chờ và lịch sử. Nhập mã PIN để xác nhận.
                </p>
                <input
                  type="password"
                  className="form-input mb-3"
                  placeholder="Nhập mã PIN để xác nhận..."
                  value={clearPin}
                  onChange={(e) => setClearPin(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleClearData()}
                  autoFocus
                />
                {clearError && (
                  <p className="text-xs text-red-500 mb-3">{clearError}</p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowClearModal(false); setClearPin(""); setClearError(""); }}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 bg-white"
                    style={{ touchAction: "manipulation", fontSize: "14px" }}
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleClearData}
                    disabled={isLoading || !clearPin.trim()}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                    style={{ background: "#ef4444", touchAction: "manipulation", fontSize: "14px", opacity: isLoading || !clearPin.trim() ? 0.6 : 1 }}
                  >
                    {isLoading ? "Đang xóa..." : "Xóa dữ liệu"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-3">
        Website được vận hành bởi <span className="font-medium text-gray-500">Đoàn Quang Kiên</span>
      </p>
    </footer>
  );
}
