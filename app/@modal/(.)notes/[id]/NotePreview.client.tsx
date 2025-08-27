'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = { id: string };

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const close = () => {
    if (window.history.length > 1) router.back();
    else router.push('/notes/filter/All');
  };

  return (
    <Modal onClose={close}>
      {isLoading && <p>Loading note…</p>}
      {isError && <p>Failed to load note.</p>}
      {data && (
        <article>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <small>{data.tag} · updated {new Date(data.updatedAt).toLocaleString()}</small>
        </article>
      )}
    </Modal>
  );
}
