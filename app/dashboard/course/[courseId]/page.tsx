"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCourseStore } from "@/store/useCourseStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useCourseSessions } from "@/hooks/useCourseSessions";
import AuthGuard from "@/components/guards/AuthGuard";
import SessionList from "@/components/dashboard/SessionList";
import CreateSessionModal from "@/components/dashboard/CreateSessionModal";

export default function Page() {
  const { courseId } = useParams<{ courseId: string }>();
  const user = useAuthStore((state) => state.user);
  const course = useCourseStore((state) =>
    state.courses.find((c) => c.id === courseId),
  );
  const {
    sessions,
    isLoading,
    refetch,
    createSession,
    isCreating,
    createError,
    setCreateError,
  } = useCourseSessions(courseId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLecturer = user?.role === "lecturer";

  const handleCreate = async (data: { title: string; description: string; mode?: string }) => {
    const success = await createSession(data);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    setCreateError("");
    setIsModalOpen(true);
  };

  return (
    <AuthGuard>
      <main className="flex min-h-screen flex-col px-6 py-16 selection:bg-white selection:text-black overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 blur-[120px] pointer-events-none">
          <div className="h-[500px] w-[500px] rounded-full bg-white/40"></div>
        </div>

        <div className="z-10 w-full max-w-4xl mx-auto">
          <Link
            href="/dashboard"
            className="font-abel text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors inline-flex items-center gap-2 mb-10"
          >
            ← Back to Courses
          </Link>

          {course ? (
            <>
              <header className="mb-12">
                <span className="font-days text-[10px] uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1 rounded-full inline-block mb-4">
                  {course.code}
                </span>
                <h1 className="font-days text-3xl md:text-5xl uppercase tracking-tighter leading-none mb-3">
                  {course.course_name}
                </h1>
                {course.description && (
                  <p className="font-abel text-sm text-white/40 leading-relaxed max-w-xl">
                    {course.description}
                  </p>
                )}
              </header>

              <section className="w-full">
                <div className="flex items-center justify-between mb-8 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <span className="font-days text-xs uppercase tracking-widest text-white/40">
                      {sessions.length} {sessions.length === 1 ? "Session" : "Sessions"}
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
                    {isLecturer && (
                      <button
                        onClick={handleOpenModal}
                        className="font-days text-[10px] uppercase tracking-widest bg-white text-black px-5 py-2 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        + Add Session
                      </button>
                    )}
                  </div>
                </div>

                <SessionList sessions={sessions} isLoading={isLoading} />
              </section>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-days text-lg uppercase tracking-tight mb-2">
                Course Not Found
              </p>
              <Link
                href="/dashboard"
                className="font-abel text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors mt-4"
              >
                Return to Dashboard
              </Link>
            </div>
          )}
        </div>

        {isLecturer && (
          <CreateSessionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreate}
            isLoading={isCreating}
            error={createError}
          />
        )}
      </main>
    </AuthGuard>
  );
}
