"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Scholarship } from "@/types/scholarship";

interface Props {
  scholarships: Scholarship[];
}

export default function ScholarshipsList({ scholarships }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      scholarships.filter((s) =>
        s.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search, scholarships]
  );

  if (!scholarships || scholarships.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">الصفحة قيد الإنشاء</h1>
        <p className="mt-4 text-lg">يرجى التحقق لاحقاً.</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-12 mx-auto bg-gradient-to-r from-blue-50 via-white to-blue-50" >
      {/* Heading and description */}
      <div className="mb-8 text-center" dir="rtl">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-2">
          المسارات الدراسية و الفرص المتنوعة
        </h1>
        <p className="text-gray-700 text-2xl">
          يمكنكم من هنا البحث عن المنح الدراسية التي تناسبكم والتقديم عليها.
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-15 flex" dir="rtl">
      <input
        type="text"
        placeholder="ابحث عن المنحة..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="ml-auto border border-gray-500 rounded-lg px-4 py-2 w-full md:w-150 text-right text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
        {filtered.map((s) => (
          <Link key={s.id} href={`/scholarships/${s.slug}`}>
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col h-full text-right" dir="rtl">
              <div className="relative w-full h-80">
                <Image
                  src={
                    s.coverImage?.url?.startsWith("http")
                      ? s.coverImage.url
                      : `http://192.168.1.180:1337${s.coverImage?.url}`
                  }
                  alt={s.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-gray-700 text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 mb-4 flex-1">{s.shortDescription}</p>
                <p className="text-sm text-gray-500">
                موعد النهاية: {s.deadline ? new Date(s.deadline).toLocaleDateString("ar-EG") : "-"}
                </p>
                
                {/* Apply / Read More Button */}
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10 2a1 1 0 011 1v12l4-4a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6A1 1 0 014.586 11L9 15V3a1 1 0 011-1z" />
                </svg>
                قدم الآن
                </button>
            </div>
            </div>
            </Link>
        ))}
      </div>
    </main>
  );
}
