const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function createMutationObserver(handler) {
  return new MutationObserver(handler);
}

export default class PageObserver {

  constructor(property, userIds, transformHandler) {
    this._userIds = userIds;
    this._property = property;
    this._transform = transformHandler;

    this.updateObserver(document.URL);
  }

  getMessageSelector() {
    return this._userIds
      .map(userId => `[data-${this._property}="${userId}"]`)
      .join(',');
  }

  transformMessages(container) {
    const selector = this.getMessageSelector();
    const messages = container && container.querySelectorAll ?
      container.querySelectorAll(selector) : [];

    Array.from(messages).forEach(this._transform);
  }

  updateObserver(url) {
    this._observer && this._observer.disconnect();

    if (!/vk\.com\/im/.test(url)) {
      return;
    }

    this.transformMessages(document);

    this._observer = createMutationObserver(mutations => {
      mutations.forEach(mutation => {
        Array.from(mutation.addedNodes).forEach(element => {
          const userId = element.dataset && element.dataset[this._property];

          if (userId && this._userIds.indexOf(userId) !== -1) {
            return this._transform(element);
          }

          this.transformMessages(element);
        });
      });
    });

    this._observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

}
