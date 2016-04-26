const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

export function createMutationObserver(handler) {
  return new MutationObserver(handler);
}
