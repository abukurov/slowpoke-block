import PageObserver from './observer';
import { PAGE_URL_UPDATED_EVENT } from './events';

import createTransformer from './transform';

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
