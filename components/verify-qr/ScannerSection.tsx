import React, { useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface ScannerSectionProps {
  isCameraActive: boolean;
  isProcessing: boolean;
  onStartScanner: () => void;
  onStopScanner: () => void;
  onDecode: (decodedText: string) => void;
  onCameraError: (error: any) => void;
}

export default function ScannerSection({
  isCameraActive,
  isProcessing,
  onStartScanner,
  onStopScanner,
  onDecode,
  onCameraError,
}: ScannerSectionProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef(false);

  const onDecodeRef = useRef(onDecode);
  onDecodeRef.current = onDecode;

  const onCameraErrorRef = useRef(onCameraError);
  onCameraErrorRef.current = onCameraError;

  const stopScanner = useCallback(async () => {
    const scanner = scannerRef.current;
    if (!scanner) return;

    try {
      const state = scanner.getState();
      if (state === 2 || state === 3) {
        await scanner.stop();
      }
      scanner.clear();
    } catch (e) {
      console.warn("Scanner cleanup warning:", e);
    }

    scannerRef.current = null;
    isScanningRef.current = false;
  }, []);

  useEffect(() => {
    if (!isCameraActive) {
      stopScanner();
      return;
    }

    if (isScanningRef.current) return;
    isScanningRef.current = true;

    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          onDecodeRef.current(decodedText);
        },
        () => {},
      )
      .catch((err) => {
        console.error("Failed to start scanner:", err);
        isScanningRef.current = false;
        onCameraErrorRef.current(err);
      });

    return () => {
      stopScanner();
    };
  }, [isCameraActive, stopScanner]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  return (
    <div className="relative group w-full flex flex-col items-center">
      <div className="absolute -inset-4 border border-white/10 rounded-[2rem] pointer-events-none transition-all duration-700 group-hover:border-white/20"></div>

      <div className="relative w-full bg-black/40 backdrop-blur-sm border border-white/5 p-4 rounded-2xl shadow-2xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
        {!isCameraActive ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
            <button
              onClick={onStartScanner}
              className="font-days text-xs uppercase tracking-[0.2em] bg-white text-black px-8 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Start Continuous Scan
            </button>
          </div>
        ) : (
          <div className="w-full">
            <div
              id="reader"
              className="w-full rounded-xl overflow-hidden"
            ></div>

            {/* Processing indicator */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isProcessing
                      ? "bg-warning animate-pulse"
                      : "bg-success animate-pulse"
                  }`}
                ></div>
                <span className="font-abel text-[10px] uppercase tracking-widest text-white/40">
                  {isProcessing ? "Verifying..." : "Ready — point at QR code"}
                </span>
              </div>
              <button
                onClick={onStopScanner}
                className="font-abel text-[10px] uppercase tracking-widest text-white/30 hover:text-danger transition-colors"
              >
                Stop Scanner
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
