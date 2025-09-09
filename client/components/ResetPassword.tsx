"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/auth";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await resetPassword(formData, searchParams.get("code") as string);

    if (result.status === "success") {
      toast.success("Password reset successfully!");
      router.push("/login");
    } else {
      setError(result.status);
      toast.error(result.status || "Failed to reset password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Reset Password
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            className="mt-1 w-full px-4 h-10 rounded-md border border-gray-300 bg-white text-sm text-gray-700"
            required
          />
        </div>

        <div className="mt-4">
          <AuthButton type="Reset Password" loading={loading} />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
