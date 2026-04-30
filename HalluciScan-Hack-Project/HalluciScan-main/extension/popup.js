/**
 * HalluciScan Popup Script
 * Handles popup interactions and status display.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check background service worker status
  chrome.runtime.sendMessage({ type: 'GET_STATUS' }, (response) => {
    if (response && response.version) {
      document.getElementById('version-text').textContent = `v${response.version} — Active`;
    }
  });
});
