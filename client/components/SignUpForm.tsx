"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/auth";

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
    const result = await signUp(formData);

    if (result.status === "success") {
      router.push("/login");
    } else {
      setError(result.status);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {/* Section 1 */}
        <div className={step !== 1 ? "hidden" : ""}>
          <div>
            <label className="block text-sm font-medium text-gray-200">Email</label>
            <input type="email" name="email" placeholder="Email" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">First Name</label>
            <input type="text" name="first_name" placeholder="First Name" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Last Name</label>
            <input type="text" name="last_name" placeholder="Last Name" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Phone Number</label>
            <input type="tel" name="phone_number" placeholder="Phone Number" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Gender</label>
            <select name="gender" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Birth Date</label>
            <input type="date" name="birth_date" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Password</label>
            <input type="password" name="password" placeholder="Password" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Confirm Password</label>
            <input type="password" name="password_confirmation" placeholder="Confirm Password" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <button type="button" onClick={() => setStep(2)} className="mt-4 p-2 bg-blue-600 text-white rounded-md">
            Next
          </button>
        </div>

        {/* Section 2 */}
        <div className={step !== 2 ? "hidden" : ""}>
          <div>
            <label className="block text-sm font-medium text-gray-200">Nationality Country</label>
            <input type="text" name="nationality_country" placeholder="Nationality Country" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Residence Country</label>
            <input type="text" name="residence_country" placeholder="Residence Country" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Residence City</label>
            <input type="text" name="residence_city" placeholder="Residence City" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Displacement Status</label>
            <input type="text" name="displacement_status" placeholder="Displacement Status" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Education Degree</label>
            <input type="text" name="education_degree" placeholder="Education Degree" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">English Level</label>
            <input type="text" name="english_level" placeholder="English Level" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Employment Status</label>
            <input type="text" name="employment_status" placeholder="Employment Status" className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700" />
          </div>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => setStep(1)} className="m-1 p-2 bg-gray-600 text-white rounded-md">
              Previous
            </button>
            <AuthButton type="Sign up" loading={loading} />
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
