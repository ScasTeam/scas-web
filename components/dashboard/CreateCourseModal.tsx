"use client";

import { useState, type SyntheticEvent } from "react";
import Modal from "@/components/ui/Modal";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { code: string; course_name: string; description: string; allowed_email_domain?: string }) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function CreateCourseModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  error,
}: CreateCourseModalProps) {
  const [code, setCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [allowedDomain, setAllowedDomain] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await onSubmit({
      code,
      course_name: courseName,
      description,
      ...(allowedDomain.trim() ? { allowed_email_domain: allowedDomain.trim() } : {}),
    });
    setCode("");
    setCourseName("");
    setDescription("");
    setAllowedDomain("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <header className="mb-8">
          <span className="font-days text-[10px] uppercase tracking-widest text-white/30 mb-2 block">
            New Entry
          </span>
          <h2 className="font-days text-2xl uppercase tracking-tighter">
            Create Course
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-abel text-[10px] uppercase tracking-widest text-white/40">
              Course Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="CS101"
              maxLength={20}
              required
              className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl font-abel text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/15 text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-abel text-[10px] uppercase tracking-widest text-white/40">
              Course Name
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Introduction to Computer Science"
              maxLength={255}
              required
              className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl font-abel text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/15 text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-abel text-[10px] uppercase tracking-widest text-white/40">
              Description
              <span className="text-white/20 ml-2">Optional</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the course..."
              maxLength={1000}
              rows={3}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl font-abel text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/15 text-white resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-abel text-[10px] uppercase tracking-widest text-white/40">
              Allowed Email Domain
              <span className="text-white/20 ml-2">Optional</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-abel text-sm text-white/20">@</span>
              <input
                type="text"
                value={allowedDomain}
                onChange={(e) => setAllowedDomain(e.target.value.toLowerCase().replace(/^@/, ''))}
                placeholder="student.uns.ac.id"
                maxLength={255}
                className="w-full bg-white/5 border border-white/10 pl-8 pr-4 py-3 rounded-xl font-abel text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/15 text-white"
              />
            </div>
            <span className="font-abel text-[9px] text-white/20">
              Leave empty to allow any email. Set to restrict enrollment to a specific domain.
            </span>
          </div>

          {error && (
            <p className="font-abel text-xs uppercase tracking-widest text-red-400 bg-red-400/10 px-4 py-3 rounded-xl border border-red-400/20 text-center">
              {error}
            </p>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-white/10 hover:bg-white/5 text-white font-days text-xs uppercase tracking-widest py-4 rounded-full transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-white text-black font-days text-xs uppercase tracking-widest py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
