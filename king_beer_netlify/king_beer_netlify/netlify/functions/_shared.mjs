import { createHash, timingSafeEqual } from "node:crypto";
import { getStore } from "@netlify/blobs";

export const DEFAULT_CATALOG = {
  brand: "King Beer",
  description: "Sodas italianas sin alcohol",
  categories: {
    sales: ["Sal limón", "Sal mexicana", "Azúcar blue ice", "Azúcar blueberry", "Azúcar lima-maracuyá", "Azúcar fresa pink", "Tajín-Chamoy"],
    siropes: ["Mango biche", "Maracuyá", "Frutos amarillos", "Frutos rojos", "Mora azul", "Lychee", "Curaçao", "Granadina"],
    bebidas: ["Soda", "Seven Up", "Ginger", "Sprite"],
    frutas: ["Mango", "Maracuyá", "Fresa", "Mora"],
    perlas: ["Mango biche", "Maracuyá", "Lychee", "Fresa"]
  }
};

export async function getCatalog() {
  const store = getStore("king-beer-data");
  return (await store.get("catalog", { type: "json" })) || DEFAULT_CATALOG;
}

export async function saveCatalog(catalog) {
  const store = getStore("king-beer-data");
  const previous = await store.get("catalog", { type: "json" });
  if (previous) await store.setJSON("catalog-previous", previous);
  await store.setJSON("catalog", catalog);
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

const sha256 = value => createHash("sha256").update(value).digest();

export function checkAdmin(request) {
  const expected = process.env.ADMIN_PASSWORD;
  const supplied = request.headers.get("x-admin-password") || "";
  if (!expected) {
    console.error("ADMIN_PASSWORD is not configured.");
    return { ok: false, response: json({ error: "El panel de administración no está disponible." }, 503) };
  }
  if (!timingSafeEqual(sha256(supplied), sha256(expected))) {
    return { ok: false, response: json({ error: "Clave de administración incorrecta." }, 401) };
  }
  return { ok: true };
}
