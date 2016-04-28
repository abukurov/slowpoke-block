import { createAddedNodesMutationObserver } from './added-nodes-observer';

export default class PageObserver {

  constructor(property, userIds, transformHandler) {
    this._userIds = userIds;
    this._property = property;
    this._transform = transformHandler;

    this.updateObserver(document.URL);
  }

  selectMessageNodes(container) {
    let selector = this.getMessageSelector();

    if (!container.querySelectorAll) {
      return [];
    }

    return Array.from(container.querySelectorAll(selector));
  }

  getMessageSelector() {
    return this._userIds
      .map(userId => `[data-${this._property}="${userId}"]`)
      .join(',');
  }

  doTransform(element) {
    const userId = element.dataset && element.dataset[this._property];

    if (userId && this._userIds.indexOf(userId) !== -1) {
      return this._transform(element);
    }

    this.selectMessageNodes(element).forEach(this._transform);
  }

  updateObserver(url) {
    this._observer && this._observer.disconnect();

    if (!/vk\.com\/im/.test(url)) {
      return;
    }

    this.doTransform(document);

    this._observer = createAddedNodesMutationObserver(element => this.doTransform(element));
    this._observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

}
