import { persist } from "zustand/middleware";
import { create } from "zustand";

export interface Course {
  id: string;
  code: string;
  course_name: string;
  description: string | null;
  lecturer_id: string;
  students_count?: number;
  sessions_count?: number;
  lecturer?: {
    id: string;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CourseState {
  courses: Course[];
  lastFetched: number | null;
  setCourses: (courses: Course[]) => void;
  updateCourse: (updated: Course) => void;
  removeCourse: (courseId: string) => void;
  clear: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      courses: [],
      lastFetched: null,
      setCourses: (courses) => set({ courses, lastFetched: Date.now() }),
      updateCourse: (updated) =>
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === updated.id ? updated : c,
          ),
          lastFetched: Date.now(),
        })),
      removeCourse: (courseId) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== courseId),
          lastFetched: Date.now(),
        })),
      clear: () => set({ courses: [], lastFetched: null }),
    }),
    {
      name: "scas-courses",
    },
  ),
);
