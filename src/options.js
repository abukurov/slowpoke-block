const idsInput = document.getElementById('user-ids');
const newVersionInput = document.getElementById('new-version');

function saveOptions() {
  // make sure we don't have duplicates
  const userIds = new Set(
    (idsInput.value || '').replace(/\s+/g, '').split(/\n|,/)
  );

  chrome.storage.sync.set({
    userIds: [...userIds],
    isNewVersion: newVersionInput.checked || false
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    userIds: [],
    isNewVersion: false
  }, items => {
    idsInput.value = items.userIds.join(', ');
    newVersionInput.checked = items.isNewVersion;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
