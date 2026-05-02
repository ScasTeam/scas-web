"use client";

import { useState } from "react";
import Link from "next/link";
import { useCourses } from "@/hooks/useCourses";
import type { Course } from "@/store/useCourseStore";
import CreateCourseModal from "@/components/dashboard/CreateCourseModal";

function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/dashboard/course/${course.id}`}>
      <div className="group relative border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <span className="font-days text-[10px] uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1 rounded-full">
            {course.code}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <span className="font-abel text-[10px] uppercase tracking-widest text-white/30">
                {course.students_count ?? 0} students
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <span className="font-abel text-[10px] uppercase tracking-widest text-white/30">
                {course.sessions_count ?? 0} sessions
              </span>
            </div>
          </div>
        </div>

        <h3 className="font-days text-xl uppercase tracking-tight mb-2 group-hover:text-white transition-colors">
          {course.course_name}
        </h3>

        {course.description && (
          <p className="font-abel text-sm text-white/40 leading-relaxed line-clamp-2">
            {course.description}
          </p>
        )}
      </div>
    </Link>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center text-center">
      <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
        <div className="w-6 h-6 border border-white/20 rounded-lg"></div>
      </div>
      <p className="font-days text-lg uppercase tracking-tight mb-2">
        No Courses Yet
      </p>
      <p className="font-abel text-xs uppercase tracking-widest text-white/30 mb-6">
        Create your first course to get started
      </p>
      <button
        onClick={onAdd}
        className="bg-white text-black font-days text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
      >
        Create Course
      </button>
    </div>
  );
}

export default function LecturerDashboard() {
  const { courses, isLoading, refetch, createCourse, isCreating, createError, setCreateError } = useCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = async (data: { code: string; course_name: string; description: string }) => {
    const success = await createCourse(data);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    setCreateError("");
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="text-center mb-16">
        <span className="font-days text-sm uppercase text-white/40 tracking-[0.3em] mb-4 block">
          Lecturer Portal
        </span>
        <h1 className="font-days text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
          Your Courses.
        </h1>
      </header>

      <section className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="font-days text-xs uppercase tracking-widest text-white/40">
              {courses.length} {courses.length === 1 ? "Course" : "Courses"}
            </span>
            {isLoading && (
              <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin"></div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={refetch}
              disabled={isLoading}
              className="font-abel text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors disabled:opacity-30"
            >
              Refresh
            </button>
            <button
              onClick={handleOpenModal}
              className="font-days text-[10px] uppercase tracking-widest bg-white text-black px-5 py-2 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
            >
              + Add Course
            </button>
          </div>
        </div>

        {courses.length === 0 && !isLoading ? (
          <EmptyState onAdd={handleOpenModal} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        isLoading={isCreating}
        error={createError}
      />
    </>
  );
}
