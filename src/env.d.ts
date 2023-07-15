/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />

interface Window {
  plausible: (eventName: string, eventProps: { props: EventProps }) => void;
}
