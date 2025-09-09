"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/auth";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const toastId = toast.loading("Creating your account...");

    try {
      const result = await signUp(formData);

      if (result.status === "success") {
        toast.success("تم إنشاء الحساب! تحقق من بريدك الإلكتروني للتأكيد.", { id: toastId });
        router.push("/login");
      } else {
        setError(result.status);
        toast.error(result.status, { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء التسجيل.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto flex flex-col gap-3 bg-white p-8 rounded-3xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>

      {/* Step 1 */}
      <div className={step !== 1 ? "hidden" : "flex flex-col gap-3"}>
        {["email", "first_name", "last_name", "phone_number", "birth_date", "password", "password_confirmation"].map((name) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {name.replace("_", " ")}
            </label>
            <input
              type={name.includes("password") ? "password" : name === "email" ? "email" : name === "birth_date" ? "date" : "text"}
              name={name}
              placeholder={name.replace("_", " ")}
              className="mt-1 w-full px-4 py-3 h-12 rounded-xl border border-gray-300 bg-white text-base text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            className="mt-1 w-full px-4 py-3 h-12 rounded-xl border border-gray-300 bg-white text-base text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => setStep(2)}
          className="mt-4 p-3 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition-all"
        >
          Next
        </button>
      </div>

      {/* Step 2 */}
      <div className={step !== 2 ? "hidden" : "flex flex-col gap-3"}>
        {["nationality_country", "residence_country", "residence_city", "displacement_status", "education_degree", "english_level", "employment_status"].map((name) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {name.replace("_", " ")}
            </label>
            <input
              type="text"
              name={name}
              placeholder={name.replace("_", " ")}
              className="mt-1 w-full px-4 py-3 h-12 rounded-xl border border-gray-300 bg-white text-base text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        ))}

        <div className="flex justify-between mt-4 gap-2">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 p-3 bg-gray-600 text-white font-semibold rounded-xl shadow hover:bg-gray-700 transition"
          >
            Previous
          </button>
          <AuthButton type="Sign up" loading={loading}  />
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  );
};

export default SignUpForm;
