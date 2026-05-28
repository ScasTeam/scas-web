import React from 'react';
import type { Session } from "@/hooks/useCourseSessions";

interface SessionSelectionProps {
  sessions: Session[];
  isLoading: boolean;
  onSelectSession: (session: Session) => void;
}

export default function SessionSelection({ sessions, isLoading, onSelectSession }: SessionSelectionProps) {
  return (
    <div className="w-full">
      <h2 className="font-days text-xs uppercase tracking-widest text-white/40 mb-4">
        Select Active Session
      </h2>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-5 h-5 border border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      ) : sessions.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center">
          <p className="font-abel text-xs uppercase tracking-widest text-white/30">
            No sessions found for this course.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {sessions.map((session) => {
            const isOpen = session.status === "open";
            return (
              <button
                key={session.id}
                onClick={() => onSelectSession(session)}
                disabled={!isOpen}
                className={`text-left border rounded-xl p-4 transition-all ${
                  isOpen
                    ? "border-success/30 hover:border-success/50 hover:bg-success/5 cursor-pointer"
                    : "border-white/5 opacity-40 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-days text-sm uppercase tracking-tight">
                    {session.title}
                  </span>
                  <span
                    className={`font-days text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                      isOpen
                        ? "border-success/30 text-success"
                        : session.status === "scheduled"
                          ? "border-warning/30 text-warning"
                          : "border-danger/30 text-danger"
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
                <span className="font-abel text-[10px] text-white/25">
                  {session.attendance_logs_count ?? 0} recorded
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
