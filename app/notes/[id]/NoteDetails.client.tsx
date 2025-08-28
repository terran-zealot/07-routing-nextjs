
"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(String(id)),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      {data.tag && <p><strong>Tag:</strong> {data.tag}</p>}
      <p><small>Updated: {new Date(data.updatedAt).toLocaleString()}</small></p>
    </article>
  );
};

export default NoteDetailsClient;
