'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import css from './Notes.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import { fetchNotes } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = {
  initialData?: FetchNotesResponse;
  tag?: Note['tag'];
};

export default function Notes({ initialData, tag }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const queryKey = ['notes', { page, perPage: 12, search: debouncedSearch, tag }];

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey,
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch, tag }),
    ...(page === 1 && debouncedSearch === '' && initialData ? { initialData } : {}),
    placeholderData: (previous) => previous,
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



// 'use client';

// import { useState } from 'react';
// import { useDebounce } from 'use-debounce';
// import { useQuery } from '@tanstack/react-query';

// import css from './Notes.module.css';
// import SearchBox from '@/components/SearchBox/SearchBox';
// import Pagination from '@/components/Pagination/Pagination';
// import NoteList from '../../../../components/NoteList/NoteList';
// import NoteModal from '@/components/Modal/Modal';
// import NoteForm from '@/components/NoteForm/NoteForm';

// import { fetchNotes } from '@/lib/api';
// import type { FetchNotesResponse } from '../../../../lib/api';

// type Props = {
//   initialData: FetchNotesResponse;
//   tag?: Note['tag'];
// };

// export default function Notes({ initialData }: Props) {
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [debouncedSearch] = useDebounce(search, 500);

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     setPage(1);
//   };

//   const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
//     queryKey: ['notes', page, debouncedSearch],
//     queryFn: () => fetchNotes({ page, search: debouncedSearch, perPage: 12 }),
//     ...(page === 1 && debouncedSearch === '' && initialData
//       ? { initialData: initialData as FetchNotesResponse }
//       : {}),
//     placeholderData: (previousData) => previousData,
//     staleTime: 1000 * 60 * 60,
//   });

//   if (isLoading) return <p>Loading notes...</p>;
//   if (isError) return <p>Error loading notes.</p>;

//   const notes = data?.notes ?? [];
//   const totalPages = data?.totalPages ?? 1;

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={search} onChange={handleSearchChange} />
//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>
//       </header>

//       {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}

//       {totalPages > 1 && (
//         <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
//       )}

//       {isModalOpen && (
//         <NoteModal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onClose={() => setIsModalOpen(false)} />
//         </NoteModal>
//       )}
//     </div>
//   );
// }
