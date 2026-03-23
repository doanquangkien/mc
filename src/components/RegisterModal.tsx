"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Pagination from "./Pagination";
import { MicIcon, ChevronDownIcon, ChevronRightIcon, PartyIcon } from "./Icons";

interface Song {
  id: string;
  title: string;
  artist: string | null;
}

interface Category {
  id: string;
  name: string;
  songs: Song[];
}

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (queueId: string) => void;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const ITEMS_PER_PAGE = 5;

export default function RegisterModal({ isOpen, onClose, onSuccess }: RegisterModalProps) {
  const [guestName, setGuestName] = useState("");
  const [songName, setSongName] = useState("");
  const [note, setNote] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [songPage, setSongPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { data: categories } = useSWR<Category[]>(isOpen ? "/api/songs" : null, fetcher);

  useEffect(() => {
    setSongPage(1);
  }, [activeCategory]);

  useEffect(() => {
    if (isOpen) {
      setSubmitSuccess(false);
    }
  }, [isOpen]);

  const currentCategory = categories?.[activeCategory];
  const totalSongs = currentCategory?.songs?.length || 0;
  const totalPages = Math.ceil(totalSongs / ITEMS_PER_PAGE);
  const paginatedSongs = currentCategory?.songs?.slice(
    (songPage - 1) * ITEMS_PER_PAGE,
    songPage * ITEMS_PER_PAGE
  ) || [];

  const handleSelectSong = (song: Song) => {
    setSongName(song.artist ? `${song.title} - ${song.artist}` : song.title);
    setShowSuggestions(false);
  };

  const handleSubmit = async () => {
    if (!guestName.trim() || !songName.trim()) return;

    const parts = guestName.split(" - ");
    const name = parts[0]?.trim() || guestName.trim();
    const role = parts[1]?.trim() || "Khách mời";

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: name,
          role: role,
          songName: songName.trim(),
          note: note.trim() || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const existingIds = JSON.parse(localStorage.getItem("myQueueIds") || "[]");
        existingIds.push(data.id);
        localStorage.setItem("myQueueIds", JSON.stringify(existingIds));

        setSubmitSuccess(true);
        onSuccess(data.id);

        setTimeout(() => {
          setGuestName("");
          setSongName("");
          setNote("");
          setSubmitSuccess(false);
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--primary)" }}>
            <MicIcon size={22} />
            Đăng ký bài hát
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            style={{ touchAction: "manipulation" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Success message */}
        {submitSuccess ? (
          <div className="flex flex-col items-center justify-center py-12">
            <PartyIcon size={48} className="text-green-500 mb-4" />
            <p className="text-lg font-semibold" style={{ color: "var(--success)" }}>
              Đăng ký thành công!
            </p>
            <p className="text-sm text-gray-500 mt-1">Vui lòng chờ MC gọi tên bạn</p>
          </div>
        ) : (
          <>
            {/* Tên */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Tên Người Hát
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ví dụ: Như Ý - Em cô dâu"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Tên bài hát */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Tên bài hát
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Nhập tên bài hát..."
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Gợi ý bài hát */}
            <div className="mb-4">
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="flex items-center gap-1.5 text-sm font-semibold mb-3"
                style={{ color: "var(--primary)", touchAction: "manipulation" }}
              >
                {showSuggestions ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
                Gợi ý bài hát?
              </button>

              {showSuggestions && categories && (
                <div>
                  {/* Category tabs */}
                  <div className="tabs-scroll mb-3">
                    {categories.map((cat, idx) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(idx)}
                        className="px-4 py-1.5 rounded-full whitespace-nowrap font-medium transition-all"
                        style={{
                          fontSize: "13px",
                          touchAction: "manipulation",
                          background: activeCategory === idx ? "var(--primary)" : "#f3f4f6",
                          color: activeCategory === idx ? "white" : "#4b5563",
                        }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Song list */}
                  <div className="rounded-xl bg-gray-50 overflow-hidden">
                    {paginatedSongs.map((song, idx) => (
                      <div
                        key={song.id}
                        className="song-item"
                        onClick={() => handleSelectSong(song)}
                        style={{
                          borderBottom: idx < paginatedSongs.length - 1 ? "1px solid #f3f4f6" : "none",
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {song.title}
                          </p>
                          {song.artist && (
                            <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                          )}
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full ml-2 shrink-0"
                          style={{ background: "#fce7f3", color: "var(--primary)" }}>
                          Chọn
                        </span>
                      </div>
                    ))}
                    {paginatedSongs.length === 0 && (
                      <p className="text-center text-sm text-gray-400 py-6">
                        Không có bài hát nào
                      </p>
                    )}
                  </div>

                  <Pagination
                    currentPage={songPage}
                    totalPages={totalPages}
                    onPageChange={setSongPage}
                  />
                </div>
              )}
            </div>

            {/* Ghi chú */}
            <div className="mb-5">
              <input
                type="text"
                className="form-input"
                placeholder="Ghi chú (tùy chọn)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Submit button */}
            <button
              className="btn-primary flex items-center justify-center gap-2"
              onClick={handleSubmit}
              disabled={isSubmitting || !guestName.trim() || !songName.trim()}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                  </svg>
                  Đang gửi...
                </>
              ) : (
                <>
                  <MicIcon size={18} />
                  Đăng ký bài hát
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
