"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCourseStore } from "@/store/useCourseStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useCourseSessions } from "@/hooks/useCourseSessions";
import { useCourseStudents } from "@/hooks/useCourseStudents";
import { useEnrollment } from "@/hooks/useEnrollment";
import AuthGuard from "@/components/guards/AuthGuard";
import SessionList from "@/components/dashboard/SessionList";
import CreateSessionModal from "@/components/dashboard/CreateSessionModal";
import CourseInfoHeader from "@/components/course-detail/CourseInfoHeader";
import CourseTabs from "@/components/course-detail/CourseTabs";
import StudentsTab from "@/components/course-detail/StudentsTab";
import AttendanceTab from "@/components/course-detail/AttendanceTab";

export default function Page() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const course = useCourseStore((state) =>
    state.courses.find((c) => c.id === courseId),
  );

  const {
    sessions,
    isLoading: isLoadingSessions,
    refetch: refetchSessions,
    createSession,
    isCreating,
    createError,
    setCreateError,
  } = useCourseSessions(courseId);

  const isLecturer = user?.role === "lecturer";

  const {
    students,
    isLoading: isLoadingStudents,
    total: studentsTotal,
    kickStudent,
  } = useCourseStudents(isLecturer ? courseId : "");

  const { leaveCourse, isLoading: isLeaving } = useEnrollment();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sessions");

  const handleCreate = async (data: {
    title: string;
    description: string;
    mode?: string;
    opened_at: string;
    closed_at: string;
  }) => {
    const success = await createSession(data);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    setCreateError("");
    setIsModalOpen(true);
  };

  const handleLeaveCourse = async () => {
    const success = await leaveCourse(courseId);
    if (success) {
      router.push("/dashboard");
    }
  };

  const tabs = [
    { id: "sessions", label: "Sessions", count: sessions.length },
    ...(isLecturer
      ? [{ id: "students", label: "Students", count: studentsTotal }]
      : []),
    { id: "attendance", label: "Attendance" },
  ];

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
              <CourseInfoHeader
                course={course}
                isLecturer={isLecturer}
                onLeaveCourse={handleLeaveCourse}
                isLeaving={isLeaving}
              />

              <CourseTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {activeTab === "sessions" && (
                <section className="w-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {isLoadingSessions && (
                        <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={refetchSessions}
                        disabled={isLoadingSessions}
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

                  <SessionList
                    sessions={sessions}
                    isLoading={isLoadingSessions}
                    isLecturer={isLecturer}
                    courseId={courseId}
                  />
                </section>
              )}

              {activeTab === "students" && isLecturer && (
                <StudentsTab
                  students={students}
                  isLoading={isLoadingStudents}
                  onKick={kickStudent}
                />
              )}

              {activeTab === "attendance" && (
                <AttendanceTab
                  sessions={sessions}
                  courseId={courseId}
                  isLecturer={isLecturer}
                />
              )}
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
