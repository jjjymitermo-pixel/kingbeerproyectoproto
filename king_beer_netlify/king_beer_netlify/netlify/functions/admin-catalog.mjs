import { checkAdmin, json, saveCatalog } from "./_shared.mjs";

export default async (request) => {
  if (request.method !== "PUT") return json({ error: "Método no permitido." }, 405);
  const auth = checkAdmin(request);
  if (!auth.ok) return auth.response;
  try {
    const data = await request.json();
    if (!data || typeof data !== "object" || !data.categories || typeof data.categories !== "object") {
      return json({ error: "Formato de catálogo no válido." }, 400);
    }
    const cleaned = { brand: "King Beer", description: "Sodas italianas sin alcohol", categories: {} };
    for (const [key, value] of Object.entries(data.categories)) {
      if (!/^[a-zA-Z0-9_-]{1,40}$/.test(key) || !Array.isArray(value) || value.length > 100 ||
          !value.every(v => typeof v === "string" && v.trim().length > 0 && v.trim().length <= 100)) {
        return json({ error: "Cada categoría debe ser una lista de nombres de productos válidos." }, 400);
      }
      cleaned.categories[key] = [...new Set(value.map(v => v.trim()))];
    }
    await saveCatalog(cleaned);
    return json({ ok: true, catalog: cleaned });
  } catch (error) {
    console.error("Catalog save error:", error.message);
    return json({ error: "No se pudo guardar el catálogo. Inténtalo de nuevo." }, 500);
  }
};
