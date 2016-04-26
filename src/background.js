import { PAGE_URL_UPDATED_EVENT } from './events';

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {
      event: PAGE_URL_UPDATED_EVENT,
      url: details.url
    });
  });
});

chrome.browserAction.setBadgeBackgroundColor({ color: '#880E4F'});

chrome.storage.sync.get({
  userIds: []
}, settings => {
  chrome.browserAction.setBadgeText({
    text: settings.userIds.length.toString()
  });
});

chrome.storage.onChanged.addListener(changes => {
  if ('userIds' in changes) {
    chrome.browserAction.setBadgeText({
      text: changes.userIds.newValue.length.toString()
    });
  }
});
