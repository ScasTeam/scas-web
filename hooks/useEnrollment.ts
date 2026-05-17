import { useState } from "react";
import api from "@/lib/axios";
import { useCourseStore } from "@/store/useCourseStore";

export const useEnrollment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const addCourse = useCourseStore((state) => state.addCourse);
  const removeCourse = useCourseStore((state) => state.removeCourse);

  const joinCourse = async (registrationCode: string): Promise<boolean> => {
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/enrollment/join", {
        registration_code: registrationCode,
      });

      addCourse(res.data.course);
      return true;
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
        setError(data.message || "Failed to join course");
      } else {
        setError("Failed to join course");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const leaveCourse = async (courseId: string): Promise<boolean> => {
    setIsLoading(true);
    setError("");

    try {
      await api.delete(`/enrollment/${courseId}`);
      removeCourse(courseId);
      return true;
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
        setError(data.message || "Failed to leave course");
      } else {
        setError("Failed to leave course");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    joinCourse,
    leaveCourse,
    isLoading,
    error,
    setError,
  };
};
