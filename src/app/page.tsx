"use client";

import React, { useState, useEffect } from "react";
import RegisterModal from "@/components/RegisterModal";
import QueueList from "@/components/QueueList";
import AdminLogin from "@/components/AdminLogin";
import { HeartIcon, MicIcon } from "@/components/Icons";

export default function Home() {
  const [showRegister, setShowRegister] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStored = localStorage.getItem("isAdmin") === "true";
    if (adminStored) {
      fetch("/api/auth")
        .then((r) => r.json())
        .then((data) => {
          if (data.isAdmin) setIsAdmin(true);
          else localStorage.removeItem("isAdmin");
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full max-w-lg mx-auto px-4 py-4">
      {/* Header */}
      <header className="text-center mb-5">
        <HeartIcon size={36} className="mx-auto text-rose-400 mb-2" />
        <h1
          className="text-2xl font-bold"
          style={{
            background: "linear-gradient(135deg, #e11d48, #be123c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Karaoke Đám Cưới
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Chọn bài hát yêu thích và lên sân khấu!
        </p>
      </header>

      {/* Queue List */}
      <main className="flex-1">
        <QueueList isAdmin={isAdmin} onRegisterClick={() => setShowRegister(true)} />
      </main>

      {/* Floating register button */}
      <button
        className="fab-register"
        onClick={() => setShowRegister(true)}
        aria-label="Đăng ký bài hát"
      >
        <MicIcon size={24} />
      </button>

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSuccess={() => {}}
      />

      {/* Admin Login in Footer */}
      <AdminLogin
        isAdmin={isAdmin}
        onLoginSuccess={() => setIsAdmin(true)}
        onLogout={() => setIsAdmin(false)}
      />
    </div>
  );
}
