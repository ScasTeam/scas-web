import React from 'react';
import type { Course } from "@/store/useCourseStore";

interface CourseSelectionProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export default function CourseSelection({ courses, onSelectCourse }: CourseSelectionProps) {
  return (
    <div className="w-full">
      <h2 className="font-days text-xs uppercase tracking-widest text-white/40 mb-4">
        Select Course
      </h2>
      {courses.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center">
          <p className="font-abel text-xs uppercase tracking-widest text-white/30">
            No courses found. Create a course first.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="text-left border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-white/[0.04] transition-all"
            >
              <span className="font-days text-[9px] uppercase tracking-widest text-white/25 mb-1 block">
                {course.code}
              </span>
              <span className="font-days text-sm uppercase tracking-tight">
                {course.course_name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
