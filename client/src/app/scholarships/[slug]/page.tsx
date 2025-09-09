import { Scholarship } from "@/types/scholarship";
import Image from "next/image";
import { remark } from "remark";
import html from "remark-html";
import ScholarshipFormWrapper from "@/components/ScholarshipFormWrapper";

interface PageProps {
  params: { slug: string };
}

// Fetch scholarship by slug
async function fetchScholarship(slug: string): Promise<Scholarship | null> {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/scholarships?filters[slug][$eq]=${slug}&populate=coverImage,formFields`,
      { next: { revalidate: 10 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (!data.data || data.data.length === 0) return null;

    return data.data[0] as Scholarship;
  } catch (err) {
    console.error("Error fetching scholarship:", err);
    return null;
  }
}

// Convert Markdown to HTML
async function renderMarkdown(content?: string) {
  if (!content) return "";
  const processed = await remark().use(html).process(content);
  return processed.toString();
}

export default async function ScholarshipPage({ params }: PageProps) {
  const { slug } = await params;
  const scholarship = await fetchScholarship(slug);

  if (!scholarship) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-700">الصفحة قيد الإنشاء</h1>
        <p className="mt-4 text-lg text-gray-500">يرجى التحقق لاحقاً.</p>
      </main>
    );
  }

  const shortDescHTML = await renderMarkdown(scholarship.shortDescription);
  const descHTML = await renderMarkdown(scholarship.description);

  return (
<main className="bg-gray-100 min-h-screen flex justify-center py-12 px-4">
  <div className="bg-white border-8 border-blue-400 rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden">
    <div className="p-10 flex flex-col gap-8 items-center">
      {/* Title above image */}
      <h1 className="text-5xl font-extrabold text-gray-900 text-center">
        {scholarship.title}
      </h1>

      {/* Image */}
      {scholarship.coverImage?.url && (
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={
              scholarship.coverImage.url.startsWith("http")
                ? scholarship.coverImage.url
                : `http://192.168.1.180:1337${scholarship.coverImage.url}`
            }
            alt={scholarship.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* Short Description */}
      {shortDescHTML && (
        <div className="w-full max-w-4xl mx-auto relative">
          <div className="absolute -top-4 left-4 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg"></div>
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 text-gray-800 text-right prose prose-ar transition-transform hover:-translate-y-1 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">نبذة قصيرة</h3>
            <div dangerouslySetInnerHTML={{ __html: shortDescHTML }} />
          </div>
        </div>
      )}

      {/* Full Description */}
      {descHTML && (
        <div className="w-full max-w-4xl mx-auto mt-6 relative">
          <div className="absolute -top-4 left-4 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full shadow-lg"></div>
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 text-gray-700 text-right prose prose-ar transition-transform hover:-translate-y-1 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">الوصف الكامل</h3>
            <div dangerouslySetInnerHTML={{ __html: descHTML }} />
          </div>
        </div>
      )}

      {/* Deadline */}
      <div className="w-full max-w-4xl mx-auto mt-6">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-1 rounded-2xl shadow-lg">
          <div className="bg-white rounded-xl px-6 py-4 flex flex-row-reverse items-center text-right gap-4">
            <span className="text-gray-700 font-semibold text-lg">:اخر موعد للتقديم على المنحة</span>
            <span className="text-blue-600 font-bold text-lg">
              {scholarship.deadline
                ? new Date(scholarship.deadline).toLocaleDateString("ar-EG")
                : "غير محدد"}
            </span>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          التسجيل في المنحة
        </h2>
        <ScholarshipFormWrapper formFields={scholarship.formFields || []} />
      </div>
    </div>
  </div>
</main>

  );
}
