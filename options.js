(function (document) {
  'use strict'; 
 
  var identificatorsInput = document.getElementById('user-ids');
  var newVersionInput = document.getElementById('new-version');

  function saveOptions() {
    var isNewVersion = newVersionInput.checked || false;
    var userIds = (identificatorsInput.value || '')
      .replace(/\s+/g, '')
      .split(/\n|,/)
      .concat(chrome.extension.getBackgroundPage().SLOWPOKE_ID)
      .filter(function (value, index, self) {
        return value && self.indexOf(value) === index;
      });

    chrome.storage.sync.set({
      userIds: userIds,
      isNewVersion: isNewVersion
    });
  }

  function restoreOptions() {
    chrome.storage.sync.get({
      userIds: [],
      isNewVersion: false
    }, function (items) {
      identificatorsInput.value = items.userIds.join(', ');
      newVersionInput.checked = items.isNewVersion;
    });
  }

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
})(document);
