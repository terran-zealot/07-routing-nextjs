import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';

type Params = Promise<{ slug?: string[] }>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const raw = slug?.[0] ?? 'All';
  const tag: Note['tag'] | undefined =
    raw === 'All' ? undefined : (decodeURIComponent(raw) as Note['tag']);

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['notes', { page: 1, perPage: 12, search: '', tag }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
