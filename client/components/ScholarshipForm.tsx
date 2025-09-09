"use client";

import { FormEvent, useState, useEffect } from "react";
import { FormField } from "@/types/scholarship";

interface Props {
  formFields: FormField[];
  prefillData?: Record<string, string>;
}

export default function ScholarshipForm({ formFields, prefillData = {} }: Props) {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    formFields.forEach((field) => {
      if (field.prefillFrom && prefillData[field.prefillFrom]) {
        initial[field.name] = prefillData[field.prefillFrom];
      }
    });
    return initial;
  });

  // Only run effect when prefillData changes
  useEffect(() => {
    if (!Object.keys(prefillData).length) return;
    const initial: Record<string, any> = {};
    formFields.forEach((field) => {
      if (field.prefillFrom && prefillData.hasOwnProperty(field.prefillFrom)) {
        initial[field.name] = prefillData[field.prefillFrom] ?? "";
      }
    });
    setFormData((prev) => ({ ...initial, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillData]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-right" dir="rtl">
      {formFields.map((field) => {
        const requiredStar = field.required ? <span className="text-red-500">*</span> : null;

        switch (field.type) {
          case "text":
          case "email":
          case "number":
            return (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="font-medium text-black">
                  {field.label} {requiredStar}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder || field.label}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            );

          case "textarea":
            return (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="font-medium">
                  {field.label} {requiredStar}
                </label>
                <textarea
                  placeholder={field.placeholder || field.label}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            );

          case "select":
            return (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="font-medium text-black">
                  {field.label} {requiredStar}
                </label>
                <select
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">{field.label}</option>
                  {field.options?.map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );

          default:
            return null;
        }
      })}

      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        سجل الآن
      </button>
    </form>
  );
}
