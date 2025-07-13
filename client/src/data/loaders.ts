import qs from 'qs';
import { fetchAPI } from "@/src/utils/fetch-api";
import { getStrapURL } from "@/src/utils/get-strapi-url";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            cta: true,
          },
        },
      },
    },
  },
}
);
export async function getHomePage() {
  const path = "/api/home";
  const BASE_URL = getStrapURL();
  const url = new URL(path, BASE_URL);
  url.search = homePageQuery;

  try {
    const res = await fetchAPI(url.href, { method: "GET" });
    if (!res?.data) return null;
    return res;
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
    return null;
  }
}