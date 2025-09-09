"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AuthButton from "./AuthButton";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message || "Login failed. Please check your email or password.");
      setLoading(false);
      return;
    }

    toast.success("Login successful!");
    setLoading(false);
    router.push("/"); // redirect after toast
  };

  const handleForgotPassword = () => {
    router.push("/reset-password"); // link to your reset password page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mt-1 w-full px-4 h-10 rounded-md border border-gray-300 bg-white text-sm text-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mt-1 w-full px-4 h-10 rounded-md border border-gray-300 bg-white text-sm text-gray-700"
          required
        />
      </div>

      <AuthButton type="login" loading={loading} />

      {/* Forgot Password Link */}
      <p
        className="text-blue-600 text-sm text-right mt-2 cursor-pointer hover:underline"
        onClick={handleForgotPassword}
      >
        Forgot Password?
      </p>
    </form>
  );
};

export default LoginForm;
