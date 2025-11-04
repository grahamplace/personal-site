export function supportsScrollTimeline(): boolean {
  return (
    typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: auto')
  );
}
