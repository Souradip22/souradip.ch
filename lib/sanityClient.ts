import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production-v1",
  useCdn: true,
  apiVersion: "2023-09-15",
});

export default client;
