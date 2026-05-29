"use client";

import { useState } from "react";
import type { EnrolledStudent } from "@/hooks/useCourseStudents";

interface StudentsTabProps {
  students: EnrolledStudent[];
  isLoading: boolean;
  onKick: (studentId: string) => Promise<boolean>;
}

export default function StudentsTab({ students, isLoading, onKick }: StudentsTabProps) {
  const [kickingId, setKickingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleKick = async (studentId: string) => {
    setKickingId(studentId);
    await onKick(studentId);
    setKickingId(null);
    setConfirmId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-5 h-5 border border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
          <div className="w-6 h-6 border border-white/20 rounded-lg"></div>
        </div>
        <p className="font-days text-lg uppercase tracking-tight mb-2">
          No Students Yet
        </p>
        <p className="font-abel text-xs uppercase tracking-widest text-accent/70">
          Share the registration code with your students
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {students.map((student) => (
        <div
          key={student.id}
          className="border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-white/15 transition-all bg-white/[0.02]"
        >
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <span className="font-days text-xs uppercase text-accent/70">
                {student.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-days text-sm uppercase tracking-tight">
                {student.name}
              </p>
              <p className="font-abel text-[10px] text-accent/40">
                {student.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-abel text-[9px] uppercase tracking-widest text-accent/40">
              {new Date(student.enrolled_at).toLocaleDateString()}
            </span>

            {confirmId === student.id ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleKick(student.id)}
                  disabled={kickingId === student.id}
                  className="font-days text-[8px] uppercase tracking-widest text-danger border border-danger/30 px-2.5 py-1 rounded-full hover:bg-danger/10 transition-all disabled:opacity-50"
                >
                  {kickingId === student.id ? "..." : "Remove"}
                </button>
                <button
                  onClick={() => setConfirmId(null)}
                  className="font-days text-[8px] uppercase tracking-widest text-accent/70 border border-white/10 px-2.5 py-1 rounded-full hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmId(student.id)}
                className="font-abel text-[9px] uppercase tracking-widest text-accent/40 hover:text-danger/60 transition-colors"
              >
                Kick
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
