import { getCatalog, json } from "./_shared.mjs";

export default async (request) => {
  if (request.method !== "GET") return json({ error: "Método no permitido." }, 405);
  try {
    return json(await getCatalog());
  } catch (error) {
    console.error("Catalog read error:", error.message);
    return json({ error: "No se pudo cargar el catálogo." }, 500);
  }
};

export const config = {
  path: "/api/catalog",
  rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ["ip", "domain"] }
};
