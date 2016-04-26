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

  function transformNewVkMessageElement(element) {
    // sick!
    if (element.tagName !== 'DIV') {
      return;
    }

    element.style.height = '55px';

    var contentEl = element.querySelector('.im-mess-stack--content');
    contentEl.innerHTML = '<strong style="color: #343434; display: block; padding-top: 21px">Прилетело НЛО и удалило эту запись</strong>';
    contentEl.style.marginLeft = '95px';

    element.querySelector('.im-mess-stack--photo img').src = chrome.extension.getURL('/images/icon_48.png');
  }

  function createTransformer(isNewVersion) {
    return isNewVersion ? transformNewVkMessageElement : transformMessageElement;
  }

  function getDataAttributeName(isNewVersion) {
    return isNewVersion ? 'peer' : 'from'
  }

  chrome.storage.sync.get({
    userIds: [],
    isNewVersion: false
  }, function (settings) {
    var pageObserver = new PageObserver(
      getDataAttributeName(settings.isNewVersion),
      settings.userIds,
      createTransformer(settings.isNewVersion)
    );

    chrome.runtime.onMessage.addListener(function handleUrlChange(response) {
      if (response.event === window.PAGE_URL_UPDATED_EVENT) {
        pageObserver.updateObserver(response.url);
      }
    });
  });
})(chrome);
