import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useCourseStore, type Course } from "@/store/useCourseStore";

const STALE_TIME = 5 * 60 * 1000;

interface CreateCourseData {
  code: string;
  course_name: string;
  description: string;
}

export const useCourses = () => {
  const { courses, lastFetched, setCourses } = useCourseStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [createError, setCreateError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await api.get("/courses");
      setCourses(res.data.courses);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load courses");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createCourse = async (data: CreateCourseData): Promise<boolean> => {
    setIsCreating(true);
    setCreateError("");

    try {
      const res = await api.post("/courses", data);
      const newCourse: Course = res.data.course;
      setCourses([newCourse, ...courses]);
      return true;
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.code?.[0] ||
        "Failed to create course";
      setCreateError(message);
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const isStale = !lastFetched || Date.now() - lastFetched > STALE_TIME;

    if (isStale) {
      fetchCourses();
    }
  }, [lastFetched]);

  return {
    courses,
    isLoading,
    error,
    refetch: fetchCourses,
    createCourse,
    isCreating,
    createError,
    setCreateError,
  };
};
