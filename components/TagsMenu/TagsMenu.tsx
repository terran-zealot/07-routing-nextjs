'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import css from './TagsMenu.module.css';


const TAGS = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

export default function TagsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className={css.menuContainer} ref={ref}>
      <button
        className={css.menuButton}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList} role="menu">
          {TAGS.map(tag => (
            <li key={tag} className={css.menuItem} role="none">
              <Link
                href={`/notes/filter/${encodeURIComponent(tag)}`}
                className={css.menuLink}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {tag === 'All' ? 'All notes' : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}