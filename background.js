chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyText",
    title: "Копіювати форматований номер",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyText" && info.selectionText) {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: copyToClipboard,
      args: [info.selectionText]
    });
  }
});

function copyToClipboard(text) {
	var formatted = text.replace(/[^+\d]/g, '');
  navigator.clipboard.writeText(formatted).then(() => {
    console.log("Text copied to clipboard: " + formatted);
  }).catch(err => {
    console.error("Failed to copy text: ", err);
  });
}




