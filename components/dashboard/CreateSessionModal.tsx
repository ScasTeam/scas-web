"use client";

import { useState, type SyntheticEvent } from "react";
import Modal from "@/components/ui/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ffffff" },
    background: { paper: "#0f0f0f" },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-abel-serif)",
          fontSize: "0.875rem",
          borderRadius: "0.75rem",
          backgroundColor: "rgba(255,255,255,0.05)",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.2)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.3)",
            borderWidth: "1px",
          },
        },
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.1)",
        },
        input: {
          padding: "12px 16px",
          color: "#ffffff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-abel-serif)",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          "&.Mui-focused": { color: "rgba(255,255,255,0.4)" },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { color: "rgba(255,255,255,0.3)" },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: { fontFamily: "var(--font-abel-serif)" },
      },
    },
  },
});

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    mode?: string;
    opened_at: string;
    closed_at: string;
  }) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function CreateSessionModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  error,
}: CreateSessionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("offline");
  const [openedDate, setOpenedDate] = useState<Dayjs | null>(null);
  const [openedTime, setOpenedTime] = useState<Dayjs | null>(null);
  const [closedDate, setClosedDate] = useState<Dayjs | null>(null);
  const [closedTime, setClosedTime] = useState<Dayjs | null>(null);

  const buildDateTime = (date: Dayjs | null, time: Dayjs | null): string => {
    if (!date || !time) return "";
    return date
      .hour(time.hour())
      .minute(time.minute())
      .second(0)
      .utc()
      .toISOString();
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const opened_at = buildDateTime(openedDate, openedTime);
    const closed_at = buildDateTime(closedDate, closedTime);
    await onSubmit({ title, description, mode, opened_at, closed_at });
    setTitle("");
    setDescription("");
    setMode("offline");
    setOpenedDate(null);
    setOpenedTime(null);
    setClosedDate(null);
    setClosedTime(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="p-8">
            <header className="mb-8">
              <span className="font-days text-[10px] uppercase tracking-widest text-white/30 mb-2 block">
                New Entry
              </span>
              <h2 className="font-days text-2xl uppercase tracking-tighter">
                Create Session
              </h2>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-abel text-[10px] uppercase tracking-widest text-white/40">
                  Session Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Week 1 — Introduction"
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
                  placeholder="Brief description of this session..."
                  maxLength={1000}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl font-abel text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/15 text-white resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-abel text-[10px] uppercase tracking-widest text-white/40">
                  Opens At
                </label>
                <div className="flex gap-3">
                  <DatePicker
                    label="Date"
                    value={openedDate}
                    onChange={setOpenedDate}
                    minDate={dayjs()}
                    slotProps={{
                      textField: { fullWidth: true, required: true },
                    }}
                  />
                  <TimePicker
                    label="Time"
                    value={openedTime}
                    onChange={setOpenedTime}
                    slotProps={{
                      textField: { fullWidth: true, required: true },
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-abel text-[10px] uppercase tracking-widest text-white/40">
                  Closes At
                </label>
                <div className="flex gap-3">
                  <DatePicker
                    label="Date"
                    value={closedDate}
                    onChange={setClosedDate}
                    minDate={openedDate ?? dayjs()}
                    slotProps={{
                      textField: { fullWidth: true, required: true },
                    }}
                  />
                  <TimePicker
                    label="Time"
                    value={closedTime}
                    onChange={setClosedTime}
                    slotProps={{
                      textField: { fullWidth: true, required: true },
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-abel text-[10px] uppercase tracking-widest text-white/40">
                  Mode
                </label>
                <div className="flex gap-3">
                  {["offline", "online"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setMode(opt)}
                      className={`flex-1 font-days text-[10px] uppercase tracking-widest py-3 rounded-xl border transition-all ${
                        mode === opt
                          ? "bg-white text-black border-white"
                          : "border-white/10 text-white/30 hover:border-white/20"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
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
        </LocalizationProvider>
      </ThemeProvider>
    </Modal>
  );
}
