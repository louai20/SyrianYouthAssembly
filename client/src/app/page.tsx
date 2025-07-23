import { getHomePage } from "@/src/data/loaders";
import { notFound } from "next/navigation";
import ClientComponent from "@/components/ClientComponent";
async function loader() {
  const data = await getHomePage();
  if(!data) notFound();
  console.log(data)
  return {...data.data};
}

export default async function HomeRoute() {
  const data = await loader();
  console.log(data);
  return (
  <div>
    <h1>{data.title}</h1>
    <p>{data.description}</p>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ClientComponent />
    </main>
  </div>
  );
}
