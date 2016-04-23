(function (window) {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var PageObserver = window.PageObserver = function (property, userIds, transformHandler) {
    this._userIds = userIds;
    this._property = property;
    this._transform = transformHandler;

    this.updateObserver(document.URL);
  };

  PageObserver.prototype.getMessageSelector = function getMessageSelector() {
    return this._userIds.map(function (userId) {
      return '[data-' + this._property + '="' + userId + '"]';
    }.bind(this)).join(',');
  };

  PageObserver.prototype.transformMessages = function transformMessages(container) {
    var selector = this.getMessageSelector();
    var messages = container && container.querySelectorAll ?
      container.querySelectorAll(selector) : [];

    Array.prototype.forEach.call(messages, this._transform);
  };

  PageObserver.prototype.updateObserver = function createObserver(url) {
    var me = this;

    me._observer && me._observer.disconnect();

    if (!/vk\.com\/im/.test(url)) {
      return;
    }

    this.transformMessages(document);

    var selector = me._userIds.map(function (userId) {
      return '[data-' + me._property + '="' + userId + '"]';
    }).join(',');

    Array.prototype.forEach.call(document.querySelectorAll(selector), this._transform);

    me._observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, function (element) {
          var userId = element.dataset && element.dataset[me._property];

          if (userId && me._userIds.indexOf(userId) !== -1) {
            return me._transform(element);
          }

          me.transformMessages(element);
        });
      });
    });

    me._observer.observe(document.body, {
        childList: true,
        subtree: true
      });
  };

})(window);
