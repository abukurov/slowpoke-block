import PageObserver from './observer';
import { PAGE_URL_UPDATED_EVENT } from './events';

const AVATAR_URL = chrome.extension.getURL('/images/icon_48.png');
const DEFAULT_MESSAGE = 'Прилетело НЛО и удалило эту запись';

function transformMessageElement(element) {
  let messageAttachmentEl = element.querySelector('.wall_module');

  element.querySelector('.im_log_author_chat_thumb img').setAttribute('src', AVATAR_URL);
  element.querySelector('.im_log_author_chat_name a').textContent = 'Slowpoke';
  element.querySelector('.im_msg_text').textContent = DEFAULT_MESSAGE;

  //Remove message attachments
  messageAttachmentEl && (messageAttachmentEl.innerHTML = '');
}

function transformNewVkMessageElement(element) {
  // sick!
  if (element.tagName !== 'DIV') {
    return;
  }

  element.style.height = '55px';

  const contentEl = element.querySelector('.im-mess-stack--content');

  contentEl.innerHTML = `<strong style="color: #343434; display: block; padding-top: 21px">${DEFAULT_MESSAGE}</strong>`;
  contentEl.style.marginLeft = '95px';

  element.querySelector('.im-mess-stack--photo img').setAttribute('src', AVATAR_URL);
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
  let pageObserver = new PageObserver(
    getDataAttributeName(settings.isNewVersion),
    settings.userIds,
    createTransformer(settings.isNewVersion)
  );

  chrome.runtime.onMessage.addListener(function handleUrlChange(response) {
    if (response.event === PAGE_URL_UPDATED_EVENT) {
      pageObserver.updateObserver(response.url);
    }
  });
});
