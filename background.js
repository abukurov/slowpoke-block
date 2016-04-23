(function (chrome) {

  chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        event: window.PAGE_URL_UPDATED_EVENT,
        url: details.url
      });
    });
  });

  chrome.browserAction.setBadgeBackgroundColor({ color: '#880E4F'});

  chrome.storage.sync.get({
    userIds: [window.SLOWPOKE_ID]
  }, function (settings) {
    chrome.browserAction.setBadgeText({
      text: settings.userIds.length.toString()
    });
  });

  chrome.storage.onChanged.addListener(function (changes) {
    if ('userIds' in changes) {
      chrome.browserAction.setBadgeText({
        text: changes.userIds.newValue.length.toString()
      });
    }
  });
})(chrome);
