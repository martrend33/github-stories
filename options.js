const DEFAULT_CHAT_URL = 'https://github-chat.com/';
const STORAGE_KEY = 'githubChatUrl';
const input = document.getElementById('chat-url');
const status = document.getElementById('status');

chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_CHAT_URL }, (items) => {
    input.value = items[STORAGE_KEY];
});

document.getElementById('save').addEventListener('click', () => {
    if (!input.checkValidity()) {
          input.reportValidity();
          return;
    }

                                                   chrome.storage.sync.set({ [STORAGE_KEY]: input.value }, () => {
                                                         status.textContent = 'Saved.';
                                                         setTimeout(() => {
                                                                 status.textContent = '';
                                                         }, 1600);
                                                   });
});
