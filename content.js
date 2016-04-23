(function (chrome) {
  var FAKE_MESSAGE_INNER_TPL =  [
    '<td></td>',
    '<td class="fake-message__image-wrapper">',
      '<img class="fake-message__image" src="' + chrome.extension.getURL('/images/icon_48.png') + '"/>',
    '</td>',
    '<td class="fake-message__text" colspan="3">Прилетело НЛО и удалило эту запись</td>'
  ].join('');

  function transformMessageElement(element) {
    element.style.setProperty('height', element.clientHeight + 'px');
    element.classList.add('fake-message');
    element.innerHTML = FAKE_MESSAGE_INNER_TPL;
  }

  chrome.storage.sync.get({
    userIds: [window.SLOWPOKE_ID],
    isNewVersion: false
  }, function (settings) {
    var pageObserver = new PageObserver('from', settings.userIds, transformMessageElement);

    chrome.runtime.onMessage.addListener(function handleUrlChange(response) {
      if (response.event === window.PAGE_URL_UPDATED_EVENT) {
        pageObserver.updateObserver(response.url);
      }
    });
  });
})(chrome);
