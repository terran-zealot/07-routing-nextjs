import { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import css from './NoteModal.module.css';

interface NoteModalProps {
  onClose: () => void;
  children?: ReactNode;
}

export default function NoteModal({ onClose, children }: NoteModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
