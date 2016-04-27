export const AVATAR_URL = chrome.extension.getURL('/images/icon_48.png');
export const DEFAULT_MESSAGE = 'Прилетело НЛО и удалило эту запись';
export const REPLACE_NAME = 'Slowpoke';

export default function (element) {
  let messageAttachmentEl = element.querySelector('.wall_module');

  element.querySelector('.im_log_author_chat_thumb img').setAttribute('src', AVATAR_URL);
  element.querySelector('.im_log_author_chat_name a').textContent = REPLACE_NAME;
  element.querySelector('.im_msg_text').textContent = DEFAULT_MESSAGE;

  //Remove message attachments
  messageAttachmentEl && (messageAttachmentEl.innerHTML = '');
}
