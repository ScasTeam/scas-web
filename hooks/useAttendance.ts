import { useState } from "react";
import api from "@/lib/axios";

export interface AttendanceRecord {
  id: string;
  student_name: string;
  student_email: string;
  status: "present" | "late";
  scanned_at: string;
  session_title: string;
}

export interface AttendeeLog {
  id: string;
  session_id: string;
  user_id: string;
  status: "present" | "late" | "sick" | "absent";
  scan_method: string;
  device_used: string;
  scanned_at: string;
  student?: {
    id: string;
    name: string;
    email: string;
  };
}

export const useAttendance = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [lastResult, setLastResult] = useState<AttendanceRecord | null>(null);

  const [attendees, setAttendees] = useState<AttendeeLog[]>([]);
  const [isLoadingAttendees, setIsLoadingAttendees] = useState(false);

  const verifyQr = async (
    qrPayload: string,
    sessionId: string,
  ): Promise<AttendanceRecord | null> => {
    setIsVerifying(true);
    setVerifyError("");
    setLastResult(null);

    try {
      const res = await api.post("/attendance/verify-qr", {
        qr_payload: qrPayload,
        session_id: sessionId,
      });

      const record: AttendanceRecord = res.data.attendance;
      setLastResult(record);
      return record;
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response
      ) {
        const data = err.response.data as { message?: string };
        setVerifyError(data.message || "Failed to verify QR code");
      } else {
        setVerifyError("Failed to verify QR code");
      }
      throw err;
    } finally {
      setIsVerifying(false);
    }
  };

  const fetchAttendees = async (courseId: string, sessionId: string) => {
    setIsLoadingAttendees(true);

    try {
      const res = await api.get(
        `/courses/${courseId}/sessions/${sessionId}/attendees`,
      );
      setAttendees(res.data.attendees || []);
    } catch {
      setAttendees([]);
    } finally {
      setIsLoadingAttendees(false);
    }
  };

  return {
    verifyQr,
    isVerifying,
    verifyError,
    setVerifyError,
    lastResult,
    setLastResult,
    fetchAttendees,
    attendees,
    isLoadingAttendees,
  };
};
