import React from "react";
import type { AttendanceRecord } from "@/hooks/useAttendance";

interface AttendanceListProps {
  records: AttendanceRecord[];
}

export default function AttendanceList({ records }: AttendanceListProps) {
  if (records.length === 0) return null;

  return (
    <div className="w-full mt-8">
      <h3 className="font-days text-xs uppercase tracking-widest text-white/40 mb-4">
        Verified This Session ({records.length})
      </h3>
      <div className="flex flex-col gap-2">
        {records.map((record, i) => (
          <div
            key={record.id || i}
            className="border border-white/10 rounded-xl p-3 flex items-center justify-between bg-white/[0.02]"
          >
            <div>
              <p className="font-days text-sm uppercase tracking-tight">
                {record.student_name}
              </p>
              <p className="font-abel text-[10px] text-white/25">
                {record.student_email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`font-days text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                  record.status === "present"
                    ? "border-green-400/30 text-green-400"
                    : "border-amber-400/30 text-amber-400"
                }`}
              >
                {record.status}
              </span>
              <span className="font-abel text-[9px] text-white/20">
                {new Date(record.scanned_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
