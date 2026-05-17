import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";

export interface EnrolledStudent {
  id: string;
  name: string;
  email: string;
  enrolled_at: string;
}

export const useCourseStudents = (courseId: string) => {
  const [students, setStudents] = useState<EnrolledStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchStudents = useCallback(async () => {
    if (!courseId) return;
    setIsLoading(true);
    try {
      const res = await api.get(`/courses/${courseId}/students`);
      setStudents(res.data.students || []);
      setTotal(res.data.total || 0);
    } catch {
      setStudents([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  const kickStudent = async (studentId: string): Promise<boolean> => {
    try {
      await api.delete(`/courses/${courseId}/students/${studentId}`);
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
      setTotal((prev) => prev - 1);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    isLoading,
    total,
    refetch: fetchStudents,
    kickStudent,
  };
};
