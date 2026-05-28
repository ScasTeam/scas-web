"use client";

import { useState } from "react";
import type { Course } from "@/store/useCourseStore";
import api from "@/lib/axios";
import { useCourseStore } from "@/store/useCourseStore";

interface CourseInfoHeaderProps {
  course: Course;
  isLecturer: boolean;
  onLeaveCourse?: () => void;
  isLeaving?: boolean;
}

export default function CourseInfoHeader({
  course,
  isLecturer,
  onLeaveCourse,
  isLeaving,
}: CourseInfoHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regCode, setRegCode] = useState(course.registration_code);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(regCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const res = await api.post(`/courses/${course.id}/regenerate-code`);
      setRegCode(res.data.registration_code);
    } catch (err) {
      console.error("Failed to regenerate code", err);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <header className="mb-10">
      <div className="flex items-start justify-between mb-4">
        <span className="font-days text-[10px] uppercase tracking-widest text-accent/70 bg-white/5 px-3 py-1 rounded-full inline-block">
          {course.code}
        </span>

        {!isLecturer && (
          <div className="relative">
            {!showLeaveConfirm ? (
              <button
                onClick={() => setShowLeaveConfirm(true)}
                className="font-abel text-[10px] uppercase tracking-widest text-danger/50 hover:text-danger border border-danger/20 hover:border-danger/40 px-4 py-1.5 rounded-full transition-all"
              >
                Leave Course
              </button>
            ) : (
              <div className="flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
                <span className="font-abel text-[10px] text-accent/70">
                  Confirm?
                </span>
                <button
                  onClick={onLeaveCourse}
                  disabled={isLeaving}
                  className="font-days text-[9px] uppercase tracking-widest text-danger border border-danger/30 px-3 py-1 rounded-full hover:bg-danger/10 transition-all disabled:opacity-50"
                >
                  {isLeaving ? "Leaving..." : "Yes"}
                </button>
                <button
                  onClick={() => setShowLeaveConfirm(false)}
                  className="font-days text-[9px] uppercase tracking-widest text-accent/70 border border-white/10 px-3 py-1 rounded-full hover:bg-white/5 transition-all"
                >
                  No
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <h1 className="font-days text-3xl md:text-5xl uppercase tracking-tighter leading-none mb-3">
        {course.course_name}
      </h1>

      {course.description && (
        <p className="font-abel text-sm text-accent/70 leading-relaxed max-w-xl mb-6">
          {course.description}
        </p>
      )}

      {isLecturer && (
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="font-abel text-[9px] uppercase tracking-widest text-accent/40">
              Invite Code:
            </span>
            <span className="font-days text-sm tracking-[0.2em] text-accent bg-white/5 px-3 py-1.5 rounded-lg">
              {regCode}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="font-abel text-[9px] uppercase tracking-widest text-accent/40 hover:text-accent transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <div className="h-4 w-px bg-white/10"></div>
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="font-abel text-[9px] uppercase tracking-widest text-warning/40 hover:text-warning transition-colors disabled:opacity-30"
          >
            {isRegenerating ? "Regenerating..." : "Regenerate"}
          </button>

          {course.allowed_email_domain && (
            <>
              <div className="h-4 w-px bg-white/10"></div>
              <span className="font-abel text-[9px] uppercase tracking-widest text-accent/40">
                Domain: @{course.allowed_email_domain}
              </span>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
