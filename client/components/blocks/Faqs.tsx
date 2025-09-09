"use client";
import { useState } from "react";
import { FAQsBlock } from "@/types/strapi";

export function FAQs({ faq }: FAQsBlock) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 w-full max-w-4xl mx-auto px-6" dir="rtl">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
        الأسئلة الشائعة
      </h2>

      <div className="space-y-6">
        {faq.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={`border rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                isOpen ? "border-blue-400" : "border-gray-200"
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(item.id)}
                className={`w-full flex justify-between items-center px-6 py-5 text-xl font-semibold focus:outline-none text-right transition-colors duration-200 ${
                  isOpen
                    ? "bg-blue-50 text-blue-700 shadow-lg shadow-blue-300"
                    : "bg-white text-gray-900 hover:bg-gray-100 shadow-md shadow-gray-300"
                }`}
              >
                <span>{item.heading}</span>
                <span className="text-2xl font-bold">{isOpen ? "−" : "+"}</span>
              </button>

              {/* Answer */}
              {isOpen && (
                <div className="px-6 pb-6 pt-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 text-lg leading-loose text-right border-t border-blue-200 transition-all duration-300">
                  {item.text}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
