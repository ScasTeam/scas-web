"use client";

import { useState } from "react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import { useEnrollment } from "@/hooks/useEnrollment";
import type { Course } from "@/store/useCourseStore";
import EnrollCourseModal from "@/components/dashboard/EnrollCourseModal";

function CourseCard({ course }: { course: Course }) {
  return (
    <Link 
      href={`/dashboard/course/${course.id}`}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      <div className="group relative border border-white/10 rounded-2xl p-6 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)]">
        <div className="flex items-start justify-between mb-4">
          <span className="font-days text-[10px] uppercase tracking-widest text-gray-400 bg-white/5 px-3 py-1 rounded-full">
            {course.code}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
            <span className="font-abel text-[10px] uppercase tracking-widest text-gray-400">
              {course.sessions_count ?? 0} sessions
            </span>
          </div>
        </div>

        <h3 className="font-days text-xl uppercase tracking-tight mb-2 group-hover:text-white transition-colors">
          {course.course_name}
        </h3>

        {course.lecturer && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <span className="font-abel text-xs text-gray-400">
              {course.lecturer.name}
            </span>
          </div>
        )}

        {course.description && (
          <p className="font-abel text-sm text-gray-400 leading-relaxed line-clamp-2">
            {course.description}
          </p>
        )}
      </div>
    </Link>
  );
}


function EmptyState({ onJoin }: { onJoin: () => void }) {
  return (
    <div className="border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center text-center">
      <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
        <div className="w-6 h-6 border border-white/20 rounded-lg"></div>
      </div>
      <p className="font-days text-lg uppercase tracking-tight mb-2">
        No Courses Yet
      </p>
      <p className="font-abel text-xs uppercase tracking-widest text-gray-400 mb-6">
        Join a course using a registration code from your lecturer
      </p>
      <button
        onClick={onJoin}
        className="bg-white text-black font-days text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
      >
        Join Course
      </button>
    </div>
  );
}

export default function StudentDashboard() {
  const { courses, isLoading, refetch } = useCourses();
  const {
    joinCourse,
    isLoading: isJoining,
    error: joinError,
    setError: setJoinError,
  } = useEnrollment();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoin = async (code: string): Promise<boolean> => {
    const success = await joinCourse(code);
    return success;
  };

  const handleOpenModal = () => {
    setJoinError("");
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="text-center mb-16">
        <span className="font-days text-sm uppercase text-gray-500 tracking-[0.3em] mb-4 block">
          Student Portal
        </span>
        <h1 className="font-days text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Your Courses.
        </h1>
      </header>

      <section className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="font-days text-xs uppercase tracking-widest text-gray-400">
              {courses.length} Enrolled
            </span>
            {isLoading && (
              <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin"></div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={refetch}
              disabled={isLoading}
              className="font-abel text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors disabled:opacity-30"
            >
              Refresh
            </button>
            <button
              onClick={handleOpenModal}
              className="font-days text-[10px] uppercase tracking-widest bg-white text-black px-5 py-2 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
            >
              + Join Course
            </button>
          </div>
        </div>

        {courses.length === 0 && !isLoading ? (
          <EmptyState onJoin={handleOpenModal} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      <EnrollCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleJoin}
        isLoading={isJoining}
        error={joinError}
      />
    </>
  );
}
