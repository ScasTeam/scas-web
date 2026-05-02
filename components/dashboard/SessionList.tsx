"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { Session } from "@/hooks/useCourseSessions";

dayjs.extend(utc);

const STATUS_STYLES: Record<string, string> = {
  open: "border-green-400/30 text-green-400",
  closed: "border-red-400/30 text-red-400",
};

function SessionCard({ session }: { session: Session }) {
  const formatTime = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    return dayjs.utc(dateStr).local().format("MMM D, h:mm A");
  };

  return (
    <div className="group border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.04]">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-days text-lg uppercase tracking-tight group-hover:text-white transition-colors">
          {session.title}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`font-days text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${STATUS_STYLES[session.status] || "border-white/20 text-white/40"}`}
          >
            {session.status}
          </span>
          <span className="font-abel text-[9px] uppercase tracking-widest text-white/20 bg-white/5 px-2.5 py-1 rounded-full">
            {session.mode}
          </span>
        </div>
      </div>

      {session.description && (
        <p className="font-abel text-sm text-white/40 leading-relaxed line-clamp-2 mb-3">
          {session.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <span className="font-abel text-[10px] uppercase tracking-widest text-white/25">
            {session.attendance_logs_count ?? 0} records
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <span className="font-abel text-[10px] uppercase tracking-widest text-white/25">
            Open: {formatTime(session.opened_at)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          <span className="font-abel text-[10px] uppercase tracking-widest text-white/25">
            Close: {formatTime(session.closed_at)}
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center text-center">
      <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
        <div className="w-6 h-6 border border-white/20 rounded-lg"></div>
      </div>
      <p className="font-days text-lg uppercase tracking-tight mb-2">
        No Sessions Yet
      </p>
      <p className="font-abel text-xs uppercase tracking-widest text-white/30">
        Create a session to start taking attendance
      </p>
    </div>
  );
}

interface SessionListProps {
  sessions: Session[];
  isLoading: boolean;
}

export default function SessionList({ sessions, isLoading }: SessionListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-5 h-5 border border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-3">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
