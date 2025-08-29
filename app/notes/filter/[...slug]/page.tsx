
import type { Note } from "@/types/note";


import NotesClient from "./Notes.client";

type Props = { params: Promise<{ slug?: string[] }> };

export default async function FilteredNotesPage({ params }: Props) {
  const { slug = [] } = await params; 
  const tagRaw = decodeURIComponent(slug[0] ?? "All");

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Notes · {tagRaw}</h1>
      <NotesClient />
    </main>
  );
}
