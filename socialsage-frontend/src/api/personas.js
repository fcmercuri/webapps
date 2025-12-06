// src/api/persona.js
import api from "./axios";

/**
 * Fetch all personas for the current user.
 * Each persona is expected to include:
 * - name, role, industry, age, bio
 * - goals: string[]
 * - painPoints: string[]
 * - channels: string[]
 * - conversionScore: number (0–100)
 */
export async function getPersonas() {
  const res = await api.get("/api/personas");
  return res.data;
}

/**
 * Create a new persona.
 * `data` can include conversionScore so lead scoring works in the UI.
 *
 * Example payload:
 * {
 *   name: string,
 *   role: string,
 *   industry: string,
 *   goals: string[],
 *   painPoints: string[],
 *   channels: string[],
 *   tone?: string,
 *   expertise?: string,
 *   conversionScore?: number  // 0–100
 * }
 */
export async function createPersona(data) {
  const res = await api.post("/api/personas", data);
  return res.data;
}

/**
 * (Optional) Update an existing persona, e.g. to adjust conversionScore
 * after real usage data or dashboard events.
 */
export async function updatePersona(id, data) {
  const res = await api.put(`/api/personas/${id}`, data);
  return res.data;
}

/**
 * (Optional) Delete a persona.
 */
export async function deletePersona(id) {
  const res = await api.delete(`/api/personas/${id}`);
  return res.data;
}
