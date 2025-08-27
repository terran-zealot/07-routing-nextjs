import NotePreview from './NotePreview.client';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NotePreview id={id} />;
}



// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// import NotePreview from '@/components/NotePreview/NotePreview';

// export default function NoteModalInterceptPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const handleClose = () => {
//     if (window.history.length > 1) router.back();
//     else router.push('/notes/filter/All');
//   };

//   return <NotePreview id={id} onClose={handleClose} />;
// }
