/**
 * HalluciScan Background Service Worker
 * Handles extension lifecycle and messaging.
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log('[HalluciScan] Extension installed successfully.');
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_STATUS') {
    sendResponse({ active: true, version: '1.0.0' });
  }
  return true;
});
