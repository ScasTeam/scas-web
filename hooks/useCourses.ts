import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useCourseStore } from "@/store/useCourseStore";

const STALE_TIME = 5 * 60 * 1000;

export const useCourses = () => {
  const { courses, lastFetched, setCourses } = useCourseStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
  };
};
