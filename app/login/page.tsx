"use client";

import { useGoogleAuth } from "@/hooks/useGoogleAuth";

export default function Page() {
  const {
    handleLogin,
    isLoading,
    setIsOtp,
    isOtp,
    email,
    otpCode,
    handleVerifyDevice,
    setOtpCode,
    otpError,
  } = useGoogleAuth();

  if (isOtp) {
    return (
      <form onSubmit={handleVerifyDevice} className="flex flex-col gap-4">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🛡️
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            New Device Detected
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            We sent a 6-digit code to <br />
            <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>

        <input
          type="text"
          maxLength={6}
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          placeholder="000000"
          className="border p-3 rounded bg-gray-50 text-center text-2xl tracking-widest font-mono focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold mt-2"
        >
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </button>

        <button
          type="button"
          onClick={() => setIsOtp(false)}
          className="text-sm text-blue-500 mt-2 hover:underline"
        >
          Back to login
        </button>
        {otpError !== "" && <p>{otpError}</p>}
      </form>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={() => handleLogin()}
        className="p-3 bg-amber-100 text-black"
        disabled={isLoading}
      >
        {isLoading ? "Memproses..." : "Login dengan Google SSO"}
      </button>
    </div>
  );
}
