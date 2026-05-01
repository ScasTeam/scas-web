"use client";

import { useCourses } from "@/hooks/useCourses";
import type { Course } from "@/store/useCourseStore";

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group relative border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.04]">
      <div className="flex items-start justify-between mb-4">
        <span className="font-days text-[10px] uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1 rounded-full">
          {course.code}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <span className="font-abel text-[10px] uppercase tracking-widest text-white/30">
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
          <span className="font-abel text-xs text-white/40">
            {course.lecturer.name}
          </span>
        </div>
      )}

      {course.description && (
        <p className="font-abel text-sm text-white/40 leading-relaxed line-clamp-2">
          {course.description}
        </p>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center text-center">
      <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
        <div className="w-6 h-6 border border-white/20 rounded-lg"></div>
      </div>
      <p className="font-days text-lg uppercase tracking-tight mb-2">
        No Courses Yet
      </p>
      <p className="font-abel text-xs uppercase tracking-widest text-white/30">
        You are not enrolled in any courses
      </p>
    </div>
  );
}

export default function StudentDashboard() {
  const { courses, isLoading, refetch } = useCourses();

  return (
    <div className="z-10 w-full max-w-4xl flex flex-col items-center">
      <header className="text-center mb-16">
        <span className="font-days text-sm uppercase text-white/40 tracking-[0.3em] mb-4 block">
          Student Portal
        </span>
        <h1 className="font-days text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6">
          Your Courses.
        </h1>
      </header>

      <section className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="font-days text-xs uppercase tracking-widest text-white/40">
              {courses.length} Enrolled
            </span>
            {isLoading && (
              <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin"></div>
            )}
          </div>
          <button
            onClick={refetch}
            disabled={isLoading}
            className="font-abel text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors disabled:opacity-30"
          >
            Refresh
          </button>
        </div>

        {courses.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-24"></div>
    </div>
  );
}
