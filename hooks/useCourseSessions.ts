import { useEffect, useState } from "react";
import api from "@/lib/axios";

export interface Session {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  mode: string;
  online_pin: string | null;
  opened_at: string | null;
  closed_at: string | null;
  attendance_logs_count?: number;
  created_at: string;
  updated_at: string;
}

interface CreateSessionData {
  title: string;
  description: string;
  mode?: string;
  opened_at: string;
  closed_at: string;
}

export const useCourseSessions = (courseId: string) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const fetchSessions = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await api.get(`/courses/${courseId}/sessions`);
      setSessions(res.data.sessions);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load sessions");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createSession = async (data: CreateSessionData): Promise<boolean> => {
    setIsCreating(true);
    setCreateError("");

    try {
      const res = await api.post(`/courses/${courseId}/sessions`, data);
      setSessions([res.data.session, ...sessions]);
      return true;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to create session";
      setCreateError(message);
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [courseId]);

  return {
    sessions,
    isLoading,
    error,
    refetch: fetchSessions,
    createSession,
    isCreating,
    createError,
    setCreateError,
  };
};
