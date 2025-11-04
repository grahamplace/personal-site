import { ReactNode } from 'react';

type SectionId = 'experience' | 'contact';

interface Props {
  id: SectionId;
  title?: string;
  children: ReactNode;
  raw?: boolean;
}

export function Section({ id, title, children, raw }: Props) {
  return (
    <section id={id} className="section pin-wrap">
      <div className="pin enter-anim exit-anim">
        {raw ? (
          children
        ) : (
          <div className="mx-auto max-w-3xl px-6 py-16 text-center">
            {title ? (
              <h2 className="mb-6 text-4xl font-semibold md:text-6xl">
                {title}
              </h2>
            ) : null}
            <div className="text-lg opacity-90">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
