import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes, type FetchNotesParams } from "@/lib/api";
import type { Note } from "@/types/note";

type Props = { params: Promise<{ slug?: string[] }> };

export default async function FilteredNotesPage({ params }: Props) {
  const { slug = [] } = await params;
  const raw = slug[0] ?? "All";
  const tagRaw = decodeURIComponent(raw);

  const options: FetchNotesParams = {
    page: 1,
    perPage: 12,
    ...(tagRaw === "All" ? {} : { tag: tagRaw.toLowerCase() as Note["tag"] }),
  };

  const { notes } = await fetchNotes(options);

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Notes · {tagRaw}</h1>
      <NoteList notes={notes} />
    </main>
  );
}
