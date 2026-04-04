import { getWorkshops, deleteWorkshop, joinWorkshop } from "../services/api";

const API_BASE = "http://localhost:8080/api";

export const getWorkshops = () => fetch(`${API_BASE}/workshops`).then(res => res.json());
export const joinWorkshop = (email, id) => fetch(`${API_BASE}/join`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, workshopId: id })
}).then(res => res.text());
export const deleteWorkshop = (id) => fetch(`${API_BASE}/workshops/${id}`, { method: "DELETE" }).then(res => res.text());