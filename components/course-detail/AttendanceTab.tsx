"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { Session } from "@/hooks/useCourseSessions";
import { useAttendance } from "@/hooks/useAttendance";
import type { AttendeeLog } from "@/hooks/useAttendance";
import api from "@/lib/axios";

dayjs.extend(utc);

interface AttendanceTabProps {
  sessions: Session[];
  courseId: string;
  isLecturer: boolean;
}

interface MySessionAttendance {
  session_id: string;
  session_title: string;
  session_status: "scheduled" | "open" | "closed";
  opened_at: string | null;
  closed_at: string | null;
  attended: boolean;
  attendance_status: "present" | "late" | "sick" | "absent" | null;
  scanned_at: string | null;
}

interface MyAttendanceStats {
  total_sessions: number;
  attended: number;
  missed: number;
  rate: number;
}

function StudentAttendanceView({ courseId }: { courseId: string }) {
  const [attendance, setAttendance] = useState<MySessionAttendance[]>([]);
  const [stats, setStats] = useState<MyAttendanceStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyAttendance = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/courses/${courseId}/my-attendance`);
        setAttendance(res.data.attendance || []);
        setStats(res.data.stats || null);
      } catch {
        setAttendance([]);
        setStats(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyAttendance();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-5 h-5 border border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (attendance.length === 0) {
    return (
      <div className="border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
          <div className="w-6 h-6 border border-white/20 rounded-lg"></div>
        </div>
        <p className="font-days text-lg uppercase tracking-tight mb-2">
          No Sessions Yet
        </p>
        <p className="font-abel text-xs uppercase tracking-widest text-accent/70">
          Your attendance will appear here once sessions are created
        </p>
      </div>
    );
  }

  const statusStyles: Record<string, string> = {
    present: "border-success/30 text-success bg-success/5",
    late: "border-warning/30 text-warning bg-warning/5",
    sick: "border-info/30 text-info bg-info/5",
    absent: "border-danger/30 text-danger bg-danger/5",
  };

  const sessionStatusStyles: Record<string, string> = {
    scheduled: "border-warning/30 text-warning",
    open: "border-success/30 text-success",
    closed: "border-danger/30 text-danger",
  };

  return (
    <div>
      {stats && (
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/5">
          <div>
            <span className="font-days text-2xl">{stats.attended}</span>
            <span className="font-abel text-[10px] uppercase tracking-widest text-accent/40 ml-2">
              Attended
            </span>
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <div>
            <span className="font-days text-2xl">{stats.missed}</span>
            <span className="font-abel text-[10px] uppercase tracking-widest text-accent/40 ml-2">
              Missed
            </span>
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <div>
            <span className="font-days text-2xl">{stats.rate}%</span>
            <span className="font-abel text-[10px] uppercase tracking-widest text-accent/40 ml-2">
              Rate
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {attendance.map((item) => (
          <div
            key={item.session_id}
            className="border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-white/15 transition-all bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <span
                className={`font-days text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                  sessionStatusStyles[item.session_status] || ""
                }`}
              >
                {item.session_status}
              </span>
              <div>
                <p className="font-days text-sm uppercase tracking-tight">
                  {item.session_title}
                </p>
                <p className="font-abel text-[10px] text-accent/40">
                  {item.opened_at
                    ? dayjs.utc(item.opened_at).local().format("MMM D, h:mm A")
                    : "Not scheduled"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {item.attended ? (
                <>
                  <span
                    className={`font-days text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border ${
                      statusStyles[item.attendance_status || "present"]
                    }`}
                  >
                    {item.attendance_status}
                  </span>
                  <span className="font-abel text-[9px] text-accent/40">
                    {item.scanned_at
                      ? dayjs.utc(item.scanned_at).local().format("h:mm A")
                      : ""}
                  </span>
                </>
              ) : (
                <span className="font-days text-[9px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 text-accent/40">
                  {item.session_status === "scheduled" ? "Upcoming" : "Absent"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendeeRow({ log }: { log: AttendeeLog }) {
  const statusStyles: Record<string, string> = {
    present: "border-success/30 text-success",
    late: "border-warning/30 text-warning",
    sick: "border-info/30 text-info",
    absent: "border-danger/30 text-danger",
  };

  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/[0.02] transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          <span className="font-days text-[9px] uppercase text-accent/70">
            {log.student?.name?.charAt(0) ?? "?"}
          </span>
        </div>
        <div>
          <p className="font-days text-xs uppercase tracking-tight">
            {log.student?.name ?? "Unknown"}
          </p>
          <p className="font-abel text-[9px] text-accent/40">
            {log.student?.email}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`font-days text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${
            statusStyles[log.status] || "border-white/10 text-accent/70"
          }`}
        >
          {log.status}
        </span>
        <span className="font-abel text-[9px] text-accent/40">
          {log.scanned_at
            ? dayjs.utc(log.scanned_at).local().format("h:mm A")
            : "—"}
        </span>
      </div>
    </div>
  );
}

function SessionAccordion({
  session,
  courseId,
}: {
  session: Session;
  courseId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { fetchAttendees, attendees, isLoadingAttendees } = useAttendance();

  const statusStyles: Record<string, string> = {
    scheduled: "border-warning/30 text-warning",
    open: "border-success/30 text-success",
    closed: "border-danger/30 text-danger",
  };

  const handleToggle = () => {
    if (!isOpen && !hasLoaded) {
      fetchAttendees(courseId, session.id);
      setHasLoaded(true);
    }
    setIsOpen(!isOpen);
  };

  const formatTime = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    return dayjs.utc(dateStr).local().format("MMM D, h:mm A");
  };

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden hover:border-white/15 transition-all">
      <button
        onClick={handleToggle}
        className="w-full text-left p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span
            className={`font-days text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
              statusStyles[session.status] || ""
            }`}
          >
            {session.status}
          </span>
          <span className="font-days text-sm uppercase tracking-tight">
            {session.title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-abel text-[10px] uppercase tracking-widest text-accent/40">
            {session.attendance_logs_count ?? 0} attended
          </span>
          <span className="font-abel text-[10px] text-accent/40">
            {formatTime(session.opened_at)}
          </span>
          <span
            className={`transition-transform duration-200 text-accent/40 text-xs ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-white/5 px-4 py-3 bg-white/[0.01]">
          {isLoadingAttendees ? (
            <div className="flex items-center justify-center py-6">
              <div className="w-4 h-4 border border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : attendees.length === 0 ? (
            <p className="font-abel text-xs text-accent/40 text-center py-6 uppercase tracking-widest">
              No attendance records
            </p>
          ) : (
            <div className="flex flex-col gap-0.5">
              {attendees.map((log) => (
                <AttendeeRow key={log.id} log={log} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LecturerAttendanceView({
  sessions,
  courseId,
}: {
  sessions: Session[];
  courseId: string;
}) {
  if (sessions.length === 0) {
    return (
      <div className="border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
          <div className="w-6 h-6 border border-white/20 rounded-lg"></div>
        </div>
        <p className="font-days text-lg uppercase tracking-tight mb-2">
          No Sessions Yet
        </p>
        <p className="font-abel text-xs uppercase tracking-widest text-accent/70">
          Create a session to start tracking attendance
        </p>
      </div>
    );
  }

  const totalSessions = sessions.length;
  const totalAttendance = sessions.reduce(
    (sum, s) => sum + (s.attendance_logs_count ?? 0),
    0,
  );

  return (
    <div>
      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/5">
        <div>
          <span className="font-days text-2xl">{totalSessions}</span>
          <span className="font-abel text-[10px] uppercase tracking-widest text-accent/40 ml-2">
            Sessions
          </span>
        </div>
        <div className="h-6 w-px bg-white/10"></div>
        <div>
          <span className="font-days text-2xl">{totalAttendance}</span>
          <span className="font-abel text-[10px] uppercase tracking-widest text-accent/40 ml-2">
            Total Records
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {sessions.map((session) => (
          <SessionAccordion
            key={session.id}
            session={session}
            courseId={courseId}
          />
        ))}
      </div>
    </div>
  );
}

export default function AttendanceTab({
  sessions,
  courseId,
  isLecturer,
}: AttendanceTabProps) {
  if (isLecturer) {
    return <LecturerAttendanceView sessions={sessions} courseId={courseId} />;
  }

  return <StudentAttendanceView courseId={courseId} />;
}
