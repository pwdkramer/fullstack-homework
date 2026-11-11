// Share successful responses and in-flight requests for this browser session.
const responses = new Map();

export const fetchJson = async function fetchJson(url, signal) {
  signal.throwIfAborted();

  if (!responses.has(url)) {
    const request = (async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })();

    responses.set(url, request);
    // Failed requests can be tried again on a later visit.
    request.catch(() => responses.delete(url));
  }

  // A shared request may finish after navigation so another page can reuse it.
  // The departing caller must not update state or start another page request.
  const data = await responses.get(url);
  signal.throwIfAborted();
  return data;
};

export const fetchAllPages = async function fetchAllPages(initialUrl, signal) {
  const results = [];
  let nextUrl = initialUrl;
  while (nextUrl) {
    const { results: pageResults, info } = await fetchJson(nextUrl, signal);
    results.push(...pageResults);
    nextUrl = info.next;
  }
  return results;
};
