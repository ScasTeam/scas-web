"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import { useAttendance } from "@/hooks/useAttendance";
import { useCourseStore } from "@/store/useCourseStore";
import type { Course } from "@/store/useCourseStore";
import type { Session } from "@/hooks/useCourseSessions";
import api from "@/lib/axios";
import RoleGuard from "@/components/guards/RoleGuard";
import type { AttendanceRecord } from "@/hooks/useAttendance";

import ToastNotification, {
  Toast,
} from "@/components/verify-qr/ToastNotification";
import CourseSelection from "@/components/verify-qr/CourseSelection";
import SessionSelection from "@/components/verify-qr/SessionSelection";
import ScannerSection from "@/components/verify-qr/ScannerSection";
import AttendanceList from "@/components/verify-qr/AttendanceList";

function VerifyQrContent() {
  const [step, setStep] = useState<
    "select-course" | "select-session" | "scanning"
  >("select-course");

  const courses = useCourseStore((state) => state.courses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const { verifyQr, fetchAttendees } = useAttendance();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scannedRecords, setScannedRecords] = useState<AttendanceRecord[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processedPayloadsRef = useRef<Set<string>>(new Set());
  const toastIdRef = useRef(0);
  const sessionIdRef = useRef<string>("");

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [{ ...toast, id }, ...prev].slice(0, 5));
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  useEffect(() => {
    if (!selectedCourse) return;

    const loadSessions = async () => {
      setIsLoadingSessions(true);
      try {
        const res = await api.get(`/courses/${selectedCourse.id}/sessions`);
        setSessions(res.data.sessions || []);
      } catch {
        setSessions([]);
      } finally {
        setIsLoadingSessions(false);
      }
    };

    loadSessions();
  }, [selectedCourse]);

  useEffect(() => {
    if (!selectedCourse || !selectedSession) return;
    fetchAttendees(selectedCourse.id, selectedSession.id);
  }, [selectedSession]);

  useEffect(() => {
    sessionIdRef.current = selectedSession?.id ?? "";
  }, [selectedSession]);

  const handleQrDecode = useCallback(
    async (decodedText: string) => {
      if (isProcessing) return;
      if (processedPayloadsRef.current.has(decodedText)) return;
      processedPayloadsRef.current.add(decodedText);
      setTimeout(() => {
        processedPayloadsRef.current.delete(decodedText);
      }, 15000);

      setIsProcessing(true);

      try {
        const result = await verifyQr(decodedText, sessionIdRef.current);

        if (result) {
          addToast({
            type: "success",
            title: result.student_name,
            subtitle: result.student_email,
            status: result.status,
          });
          setScannedRecords((prev) => [result, ...prev]);
        }
      } catch (err: unknown) {
        let errorMessage = "Verification failed";
        if (
          err &&
          typeof err === "object" &&
          "response" in err &&
          err.response &&
          typeof err.response === "object" &&
          "data" in err.response
        ) {
          const data = err.response.data as { message?: string };
          errorMessage = data.message || errorMessage;
        }
        addToast({
          type: "error",
          title: "Denied",
          subtitle: errorMessage,
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, verifyQr, addToast],
  );

  const handleCameraError = useCallback(
    (err: any) => {
      addToast({ type: "error", title: "Camera Error", subtitle: String(err) });
      setIsCameraActive(false);
    },
    [addToast],
  );

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setSelectedSession(null);
    setSessions([]);
    setStep("select-session");
  };

  const handleSelectSession = (session: Session) => {
    setSelectedSession(session);
    setScannedRecords([]);
    processedPayloadsRef.current.clear();
    setStep("scanning");
    setIsCameraActive(false);
  };

  const handleBack = () => {
    if (step === "scanning") {
      setIsCameraActive(false);
      setStep("select-session");
    } else if (step === "select-session") {
      setStep("select-course");
      setSelectedCourse(null);
    }
  };

  if (!isClient) return null;

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-16 selection:bg-white selection:text-black overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 blur-[120px] pointer-events-none">
        <div className="h-[600px] w-[600px] rounded-full bg-white"></div>
      </div>

      <ToastNotification toasts={toasts} />

      <div className="z-10 w-full max-w-2xl flex flex-col items-center">
        <header className="text-center mb-12">
          <span className="font-days text-sm uppercase text-white/40 tracking-[0.3em] mb-4 block">
            Security Protocol
          </span>
          <h1 className="font-days text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-4">
            Verify <br /> Identity.
          </h1>
          {selectedCourse && selectedSession && (
            <div className="flex flex-col items-center gap-1 mt-4">
              <span className="font-days text-[10px] uppercase tracking-widest text-white/30">
                {selectedCourse.course_name}
              </span>
              <span className="font-abel text-[10px] uppercase tracking-widest text-white/20">
                Session: {selectedSession.title}
              </span>
            </div>
          )}
        </header>

        {step !== "select-course" && (
          <button
            onClick={handleBack}
            className="self-start font-abel text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors mb-6"
          >
            ← Back
          </button>
        )}

        {step === "select-course" && (
          <CourseSelection
            courses={courses}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {step === "select-session" && (
          <SessionSelection
            sessions={sessions}
            isLoading={isLoadingSessions}
            onSelectSession={handleSelectSession}
          />
        )}

        {step === "scanning" && (
          <div className="w-full flex flex-col items-center">
            <ScannerSection
              isCameraActive={isCameraActive}
              isProcessing={isProcessing}
              onStartScanner={() => setIsCameraActive(true)}
              onStopScanner={() => setIsCameraActive(false)}
              onDecode={handleQrDecode}
              onCameraError={handleCameraError}
            />

            <AttendanceList records={scannedRecords} />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}

export default function Page() {
  return (
    <RoleGuard role="lecturer">
      <VerifyQrContent />
    </RoleGuard>
  );
}
