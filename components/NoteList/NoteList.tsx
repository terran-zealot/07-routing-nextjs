"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";

type Props = { notes: Note[] };

export default function NoteList({ notes }: Props) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onDelete = async (id: string) => {
    setBusyId(id);
    try {
      await deleteNote(id);
      startTransition(() => router.refresh());
    } finally {
      setBusyId(null);
    }
  };

  if (!notes?.length) return <p>No notes yet.</p>;

  return (
    <ul>
      {notes.map((n) => (
        <li key={n.id} className="mb-3">
          <div className="flex items-center gap-3">
            <Link href={`/notes/${encodeURIComponent(n.id)}`}>
              <h3 className="font-semibold underline">{n.title || "Untitled"}</h3>
            </Link>
            <button
              onClick={() => onDelete(n.id)}
              disabled={isPending || busyId === n.id}
              aria-busy={isPending || busyId === n.id}
            >
              {busyId === n.id ? "Deleting..." : "Delete"}
            </button>
          </div>
          {n.content ? (
            <p className="opacity-80 text-sm">{n.content.slice(0, 120)}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
