'use client';

import { useParams, useRouter } from 'next/navigation';
import NotePreview from '@/components/NotePreview/NotePreview';

export default function NoteModalInterceptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleClose = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/notes/filter/All');
    }
  };

  return <NotePreview id={id} onClose={handleClose} />;
}
