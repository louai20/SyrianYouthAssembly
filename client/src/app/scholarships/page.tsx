import ScholarshipsList from "./ScholarshipsList";

export default async function ScholarshipsPage() {
  const res = await fetch(`${process.env.STRAPI_API_URL}/scholarships`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  const scholarships = data?.data || [];

  return <ScholarshipsList scholarships={scholarships} />;
}
