'use client';

import { useQuery } from '@tanstack/react-query';
import NoteModal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { fetchNoteById } from '@/lib/api'; // або '@/lib/api/notes'
import type { Note } from '@/types/note';

export default function NotePreview({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <NoteModal onClose={onClose}>
      {isLoading && <p>Loading note…</p>}
      {isError && <p>Failed to load note.</p>}
      {data && (
        <article className={css.preview}>
          <header className={css.header}>
            <h2 className={css.title}>{data.title}</h2>
            <span className={css.tag}>{data.tag}</span>
          </header>
          <p className={css.content}>{data.content}</p>
          <footer className={css.meta}>
            <time dateTime={data.createdAt}>
              Created: {new Date(data.createdAt).toLocaleString()}
            </time>
            <time dateTime={data.updatedAt}>
              Updated: {new Date(data.updatedAt).toLocaleString()}
            </time>
          </footer>
        </article>
      )}
    </NoteModal>
  );
}
