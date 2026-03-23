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
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <footer className="py-6 text-center">
      {isAdmin ? (
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <UnlockIcon size={14} /> Admin Mode
          </span>
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
          className="text-xs text-gray-300 hover:text-gray-500 transition-colors"
          style={{ touchAction: "manipulation" }}
        >
          Đăng nhập
        </button>
      )}

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
    </footer>
  );
}
