import NotesClient from "./Notes.client";
import { fetchNotes, type FetchNotesParams } from "@/lib/api";
import type { Note } from "@/types/note";

type Props = { params: Promise<{ slug?: string[] }> };


const TAG_MAP = {
  todo: "Todo",
  work: "Work",
  personal: "Personal",
  meeting: "Meeting",
  shopping: "Shopping",
} as const satisfies Record<string, Note["tag"]>;
type TagMapKey = keyof typeof TAG_MAP;

function normalizeTag(raw: string): Note["tag"] | undefined {
  const key = raw.toLowerCase() as TagMapKey;
  return TAG_MAP[key];
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug = [] } = await params;
  const tagRaw = decodeURIComponent(slug[0] ?? "All");
  const tag = tagRaw === "All" ? undefined : normalizeTag(tagRaw);


  const options: FetchNotesParams = {
    page: 1,
    perPage: 12,
    search: "",
    ...(tag ? { tag } : {}),
  };
  const initialData = await fetchNotes(options);

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Notes · {tagRaw}</h1>
      <NotesClient key={tag ?? "all"} tag={tag} initialData={initialData} />
    </main>
  );
}
