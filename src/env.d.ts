/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  plausible: (eventName: string, eventProps: { props: EventProps }) => void;
  tiInstances: any;
}
