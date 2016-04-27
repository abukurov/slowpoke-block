import { AVATAR_URL, DEFAULT_MESSAGE, REPLACE_NAME } from './vk-message-node';

export default function (element) {
  // sick!
  if (element.tagName !== 'DIV') {
    return;
  }

  element.querySelector('.im-mess-stack--photo img').setAttribute('src', AVATAR_URL);
  element.querySelector('.im-mess-stack--pname .im-mess-stack--lnk').textContent = REPLACE_NAME;

  Array.from(element.querySelectorAll('.im-mess-stack .im-mess--text')).forEach(el => {
    el.innerHTML = '';
    el.textContent = DEFAULT_MESSAGE;
  });

}
