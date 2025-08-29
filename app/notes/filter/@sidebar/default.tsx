
import Link from "next/link";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function Sidebar() {
  return (
    <aside>
      <nav aria-label="Notes filters">
        <ul className="space-y-2">
          {TAGS.map((tag) => (
            <li key={tag}>
              <Link
                href={`/notes/filter/${encodeURIComponent(tag)}`}
                className="inline-block rounded px-3 py-2 hover:underline"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
