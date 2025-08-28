// app/notes/filter/[...slug]/page.tsx
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes, type FetchNotesParams } from "@/lib/api";
import type { Note } from "@/types/note";

type Props = { params: Promise<{ slug?: string[] }> };

export default async function FilteredNotesPage({ params }: Props) {

  const { slug = [] } = await params;
  const raw = slug[0] ?? "All";
  const tag = decodeURIComponent(raw);

  const options: FetchNotesParams = {
    page: 1,
    perPage: 12,
    ...(tag === "All" ? {} : { tag: tag as Note["tag"] }),
  };

  const { notes } = await fetchNotes(options);

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Notes · {tag}</h1>
      <NoteList notes={notes} />
    </main>
  );
}





// import NotesList from "@/components/NoteList/NoteList";
// import { fetchNotes, type FetchNotesParams } from "@/lib/api";
// import type { Note } from "@/types/note";

// type PageProps = { params: { slug?: string[] } };

// export default async function FilteredNotesPage({ params }: PageProps) {
//   const raw = params.slug?.[0] ?? "All";
//   const tag = decodeURIComponent(raw);

//   const paramsForApi: FetchNotesParams = {
//     page: 1,
//     perPage: 12,
//     ...(tag === "All" ? {} : { tag: tag as Note["tag"] }),
//   };

//   const { notes } = await fetchNotes(paramsForApi);

//   return (
//     <main>
//       <h1 className="text-2xl font-semibold mb-4">Notes · {tag}</h1>
//       <NotesList notes={notes} />
//     </main>
//   );
// }
