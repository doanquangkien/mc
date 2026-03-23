import React from "react";

const iconProps = { width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function MicIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

export function MusicNoteIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="18" cy="16" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function ListIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

export function StarIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function XIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function XCircleIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

export function MapPinIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function MessageIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function LockIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function UnlockIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

export function HistoryIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M3 3v5h5" />
      <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

export function HeartIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg {...iconProps} width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function PartyIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5.8 11.3L2 22l10.7-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 3l.5.5M22 8l-.5.5M16 2l-.5.5M11 2l-.5.5M22 13l-.5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="15" cy="5" r="1" fill="currentColor" />
      <circle cx="18" cy="10" r="1" fill="currentColor" />
      <path d="M6.5 12.5C8.5 8.5 12 4 18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
