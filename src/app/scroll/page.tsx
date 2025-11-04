import SectionNav from '@/components/scroll/SectionNav';
import { Section } from '@/components/scroll/Section';
import { Experience } from '@/components/home/experience';
import { Contact } from '@/components/home/contact';
import { SmoothProvider } from '@/components/scroll/SmoothProvider';

export default function ScrollDemoPage() {
  return (
    <SmoothProvider>
      <main className="snap-y">
        <SectionNav />

        <Section id="experience" raw>
          <div className="w-full">
            <div className="snap-start">
              <Experience id="experience" />
            </div>
          </div>
        </Section>

        <Section id="contact" raw>
          <div className="w-full">
            <div className="snap-start">
              <Contact id="contact" />
            </div>
          </div>
        </Section>

        <div style={{ height: '20vh' }} aria-hidden />
      </main>
    </SmoothProvider>
  );
}
