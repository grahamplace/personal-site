import { ResumeSection } from './resume-section';
import { ResumeItem } from './resume-item';
import experienceData from '@/content/experience.json';

export function Resume() {
  return (
    <div className="space-y-8">
      <ResumeSection title="Experience">
        {experienceData.map((job, index) => (
          <ResumeItem
            key={index}
            title={job.role}
            company={job.company}
            startDate={job.start}
            endDate={job.end || undefined}
            description={job.summary}
            highlights={job.highlights}
            tech={job.tech}
          />
        ))}
      </ResumeSection>
    </div>
  );
}
