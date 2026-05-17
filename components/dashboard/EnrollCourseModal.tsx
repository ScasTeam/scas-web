"use client";

import { useState, type SyntheticEvent } from "react";
import Modal from "@/components/ui/Modal";

interface EnrollCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (registrationCode: string) => Promise<boolean>;
  isLoading: boolean;
  error: string;
}

export default function EnrollCourseModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  error,
}: EnrollCourseModalProps) {
  const [code, setCode] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const success = await onSubmit(code.trim().toUpperCase());
    if (success) {
      setCode("");
      onClose();
    }
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-8">
        <header className="mb-8">
          <span className="font-days text-[10px] uppercase tracking-widest text-white/30 mb-2 block">
            Enrollment
          </span>
          <h2 className="font-days text-2xl uppercase tracking-tighter">
            Join Course
          </h2>
          <p className="font-abel text-sm text-white/40 mt-2">
            Enter the registration code provided by your lecturer.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-abel text-[10px] uppercase tracking-widest text-white/40">
              Registration Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={8}
              required
              autoFocus
              className="w-full bg-white/5 border border-white/10 px-4 py-4 rounded-xl font-days text-2xl tracking-[0.3em] text-center focus:outline-none focus:border-white/30 transition-all placeholder:text-white/15 text-white uppercase"
            />
          </div>

          {error && (
            <p className="font-abel text-xs uppercase tracking-widest text-red-400 bg-red-400/10 px-4 py-3 rounded-xl border border-red-400/20 text-center">
              {error}
            </p>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-white/10 hover:bg-white/5 text-white font-days text-xs uppercase tracking-widest py-4 rounded-full transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || code.trim().length === 0}
              className="flex-1 bg-white text-black font-days text-xs uppercase tracking-widest py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? "Joining..." : "Join"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
