
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Note, CreateNoteParams } from "../types/note";

const API_BASE =
  process.env.NEXT_PUBLIC_NOTEHUB_API ?? "https://notehub-public.goit.study/api";
const BEARER_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
  tag?: Note["tag"];
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = "",
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim()) params.search = search.trim();
  if (tag) params.tag = tag;

  const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params,
  });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.get(`/notes/${encodeURIComponent(id)}`);
  return res.data;
}

export async function createNote(note: CreateNoteParams): Promise<Note> {
  const res: AxiosResponse<Note> = await api.post("/notes", note);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${encodeURIComponent(id)}`);
  return res.data;
}
