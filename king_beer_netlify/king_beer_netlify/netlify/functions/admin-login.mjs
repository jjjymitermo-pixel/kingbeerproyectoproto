import { checkAdmin, json } from "./_shared.mjs";

export default async (request) => {
  if (request.method !== "POST") return json({ error: "Método no permitido." }, 405);
  const result = checkAdmin(request);
  if (!result.ok) return result.response;
  return json({ ok: true });
};

export const config = {
  path: "/api/admin/login-check",
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] }
};
