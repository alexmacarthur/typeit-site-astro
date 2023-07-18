interface EventProps {
  [key: string]: string | number | boolean;
}

export function parseExcerpt(excerpt: string) {
  return excerpt
    .trim()
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/(\r\n|\n|\r)/gm, "")
    .split(" ")
    .slice(0, 50)
    .join(" ");
}

export function sendEvent(eventName: string, eventProps: EventProps = {}) {
  eventProps.path = window.location.pathname;

  if (!window.plausible || import.meta.env.NODE_ENV === "development") {
    return console.log({
      event_name: eventName,
      event_data: eventProps,
    });
  }

  window.plausible(eventName, {
    props: eventProps,
  });
}

export function getUrlParams() {
  return new URLSearchParams(window.location.search);
}

export function updateQueryParams(params: URLSearchParams) {
  window.history.pushState(
    null,
    "",
    `${window.location.pathname}?${params.toString()}`,
  );
}
