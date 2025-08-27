import type { ReactNode } from 'react';
import css from './layout.module.css';

export default function FilterLayout({
  children,
  sidebar,
  // modal,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  // modal: ReactNode;
}) {
  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.content}>{children}</main>
      {/* {modal} */}
    </div>
  );
}
