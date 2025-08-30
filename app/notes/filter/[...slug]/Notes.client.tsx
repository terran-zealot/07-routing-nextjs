"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import css from "./Notes.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteModal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import type { Note } from "@/types/note";

type Props = {
  initialData?: FetchNotesResponse;
  tag?: Note["tag"];
};

export default function Notes({ initialData, tag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);


  useEffect(() => {
    setPage(1);
  }, [tag]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };


  const queryKey = useMemo(
    () => ["notes", { page, perPage: 12, search: debouncedSearch, tag }] as const,
    [page, debouncedSearch, tag]
  );

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error, FetchNotesResponse>({
    queryKey,
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag,
      }),

    initialData: page === 1 && debouncedSearch === "" && initialData ? initialData : undefined,

    placeholderData: (prev) => prev as FetchNotesResponse | undefined,
    staleTime: 60 * 60 * 1000,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes.</p>;

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}

      {totalPages > 1 && (
        <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
      )}

      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </NoteModal>
      )}
    </div>
  );
}
