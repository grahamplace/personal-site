'use client';

import Link from 'next/link';
import { useSectionHash } from './useSectionHash';

const items = [
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export default function SectionNav() {
  const current = useSectionHash(items.map((i) => i.id));

  return (
    <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-white backdrop-blur">
      <ul className="flex gap-4">
        {items.map(({ id, label }) => (
          <li key={id}>
            <Link
              href={`#${id}`}
              className={`transition-opacity ${current === id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
