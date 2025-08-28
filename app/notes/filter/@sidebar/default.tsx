
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./SidebarNotes.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function Default() {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") ?? "All";

  return (
    <nav aria-label="Filter notes by tag">
      <ul className={styles.menuList}>
        {tags.map((tag) => {
          const isActive =
            currentTag === tag || (tag === "All" && !searchParams.get("tag"));
          const href = tag === "All" ? "/notes" : `/notes?tag=${tag}`;

          return (
            <li key={tag} className={styles.menuItem}>
              <Link
                href={href}
                className={`${styles.menuLink} ${isActive ? styles.active : ""}`}
              >
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
