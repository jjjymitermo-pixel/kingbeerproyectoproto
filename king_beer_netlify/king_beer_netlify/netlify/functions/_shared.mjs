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
  await store.setJSON("catalog", catalog);
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

export function checkAdmin(request) {
  const expected = process.env.ADMIN_PASSWORD;
  const supplied = request.headers.get("x-admin-password") || "";
  if (!expected) return { ok: false, response: json({ error: "Falta configurar ADMIN_PASSWORD en las variables de entorno de Netlify." }, 503) };
  if (supplied.length !== expected.length || supplied !== expected) {
    return { ok: false, response: json({ error: "Clave de administración incorrecta." }, 401) };
  }
  return { ok: true };
}
