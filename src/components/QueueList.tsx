"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Pagination from "./Pagination";
import { ListIcon, MapPinIcon, MusicNoteIcon, MicIcon, StarIcon, CheckCircleIcon, MessageIcon, HistoryIcon } from "./Icons";

interface QueueItem {
  id: string;
  guestName: string;
  role: string;
  songName: string;
  note: string | null;
  status: string;
  createdAt: string;
}

interface QueueListProps {
  isAdmin: boolean;
  onRegisterClick: () => void;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const ITEMS_PER_PAGE = 10;

export default function QueueList({ isAdmin, onRegisterClick }: QueueListProps) {
  const [myIds, setMyIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const apiUrl = isAdmin ? "/api/queue?history=true" : "/api/queue";
  const { data: allItems, mutate } = useSWR<QueueItem[]>(apiUrl, fetcher, {
    refreshInterval: 3000,
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myQueueIds") || "[]");
    setMyIds(stored);
  }, []);

  const waitingItems = allItems?.filter((item) => item.status === "WAITING" || item.status === "PRIORITY") || [];
  const doneItems = allItems?.filter((item) => item.status === "DONE") || [];

  const totalWaitingPages = Math.ceil(waitingItems.length / ITEMS_PER_PAGE);
  const paginatedWaiting = waitingItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const myPosition = waitingItems.findIndex((item) => myIds.includes(item.id));

  const handleAction = async (id: string, status: string) => {
    try {
      await fetch(`/api/queue/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      mutate();
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  return (
    <div>
      {/* My position notification */}
      {myPosition >= 0 && (
        <div
          className="glass-card px-4 py-3 mb-4 flex items-center gap-3"
          style={{ borderLeft: "3px solid var(--primary)" }}
        >
          <MapPinIcon size={22} className="text-rose-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
              Bạn đang ở vị trí số {myPosition + 1}
            </p>
            <p className="text-xs text-gray-500">Vui lòng chờ MC gọi tên</p>
          </div>
        </div>
      )}

      {/* Queue header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <ListIcon size={20} />
          Danh sách chờ
          <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
            {waitingItems.length}
          </span>
        </h2>
        <button
          onClick={onRegisterClick}
          className="btn-primary flex items-center gap-1.5"
          style={{ width: "auto", padding: "8px 16px", fontSize: "13px" }}
        >
          <MicIcon size={14} />
          Đăng ký
        </button>
      </div>

      {/* Queue items */}
      {paginatedWaiting.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          {paginatedWaiting.map((item, idx) => {
            const isOwn = myIds.includes(item.id);
            const globalIndex = (page - 1) * ITEMS_PER_PAGE + idx + 1;

            return (
              <div
                key={item.id}
                className={`glass-card px-4 py-3 ${isOwn ? "own-item" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{
                        background: item.status === "PRIORITY" ? "#ede9fe" : "#f3f4f6",
                        color: item.status === "PRIORITY" ? "var(--badge-priority)" : "#6b7280",
                      }}
                    >
                      {globalIndex}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {item.guestName}
                        </p>
                        <span className="text-xs text-gray-400">({item.role})</span>
                        {item.status === "PRIORITY" && (
                          <span className="badge badge-priority flex items-center gap-1">
                            <StarIcon size={10} /> Ưu tiên
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5 truncate flex items-center gap-1">
                        <MusicNoteIcon size={14} className="shrink-0" />
                        {item.songName}
                      </p>
                      {item.note && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate flex items-center gap-1">
                          <MessageIcon size={12} className="shrink-0" />
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Admin actions */}
                {isAdmin && (
                  <div className="flex gap-2 mt-2.5 pl-10">
                    {item.status !== "PRIORITY" && (
                      <button
                        className="btn-action flex items-center gap-1"
                        style={{ background: "#ede9fe", color: "var(--badge-priority)" }}
                        onClick={() => handleAction(item.id, "PRIORITY")}
                      >
                        <StarIcon size={12} /> Ưu tiên
                      </button>
                    )}
                    <button
                      className="btn-action flex items-center gap-1"
                      style={{ background: "#d1fae5", color: "var(--badge-done)" }}
                      onClick={() => handleAction(item.id, "DONE")}
                    >
                      <CheckCircleIcon size={12} /> Đã hát
                    </button>
                    <button
                      className="btn-action flex items-center gap-1"
                      style={{ background: "#fee2e2", color: "#ef4444" }}
                      onClick={() => handleAction(item.id, "CANCELED")}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      Xóa
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card py-12 text-center">
          <MusicNoteIcon size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-400">Chưa có ai đăng ký bài hát</p>
          <p className="text-xs text-gray-300 mt-1">Hãy là người đầu tiên!</p>
          <button
            onClick={onRegisterClick}
            className="btn-primary mt-4 flex items-center justify-center gap-2 mx-auto"
            style={{ width: "auto", padding: "10px 24px" }}
          >
            <MicIcon size={16} />
            Đăng ký bài hát
          </button>
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalWaitingPages}
        onPageChange={setPage}
      />

      {/* History section - admin only */}
      {isAdmin && doneItems.length > 0 && (
        <HistorySection items={doneItems} />
      )}
    </div>
  );
}

function HistorySection({ items }: { items: QueueItem[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginated = items.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
        <HistoryIcon size={20} />
        Lịch sử đã hát
        <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-green-50 text-green-600">
          {items.length}
        </span>
      </h2>
      <div className="flex flex-col gap-2">
        {paginated.map((item) => (
          <div key={item.id} className="glass-card px-4 py-2.5 opacity-60">
            <div className="flex items-center gap-2">
              <span className="badge badge-done">Đã hát</span>
              <p className="text-sm text-gray-600 truncate">
                <span className="font-semibold">{item.guestName}</span>
                {" - "}
                {item.songName}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
