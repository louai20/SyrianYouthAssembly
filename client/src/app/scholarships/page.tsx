import React from 'react';
import { getHomePage } from "@/src/data/loaders";

async function loader() {
  const data = await getHomePage();
  if(!data) notFound();
  console.log(data)
  return {...data.data};
}
async function getScholarships() {
  const data = await loader();
  return data.data;
}

export default async function ScholarshipsPage() {
  const scholarships = await getScholarships();
  return (
    <div></div>

  );
}