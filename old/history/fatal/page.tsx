import { getThreadsHistory } from "@/lib/utils";
import { getAccessToken } from "@auth0/nextjs-auth0";
import Translator from "@/components/translator";

async function getData() {
  const res = await fetch("https://dogapi.dog/api/v2/breeds");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const { accessToken } = await getAccessToken();

  if (!accessToken) {
    return <h1>Error: Access token is undefined</h1>;
  }

  return (
    <div className="flex flex-1">
      <Translator />
    </div>
  );
}
