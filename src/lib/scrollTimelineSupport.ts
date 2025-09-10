export function supportsScrollTimeline(): boolean {
  // @ts-expect-error CSS may be undefined on server
  return (
    typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: auto')
  );
}
