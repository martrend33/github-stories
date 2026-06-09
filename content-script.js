const DEFAULT_CHAT_URL = 'https://github-chat.com/';
const STORAGE_KEY = 'githubChatUrl';
const ROOT_ID = 'github-chat-extension-root';

function buildChatUrl(baseUrl) {
    const url = new URL(baseUrl);
    url.searchParams.set('source', 'extension');
    url.searchParams.set('github_url', window.location.href);
    return url.toString();
}

function shouldUseFallback(baseUrl) {
    try {
          return new URL(baseUrl).hostname === 'github-chat.com';
    } catch (error) {
          return true;
    }
}

function createChatFrame(chatUrl) {
    const useFallback = shouldUseFallback(chatUrl);
    const root = document.createElement('div');
    root.id = ROOT_ID;
    root.className = 'github-chat-extension is-collapsed';

  const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'github-chat-extension__toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'github-chat-extension-panel');
    toggle.textContent = 'Chat';

  const panel = document.createElement('section');
    panel.id = 'github-chat-extension-panel';
    panel.className = 'github-chat-extension__panel';
    panel.setAttribute('aria-label', 'GitHub Chat');

  const header = document.createElement('div');
    header.className = 'github-chat-extension__header';
    header.textContent = 'GitHub Chat';

  const close = document.createElement('button');
    close.type = 'button';
    close.className = 'github-chat-extension__close';
    close.setAttribute('aria-label', 'Close GitHub Chat');
    close.textContent = 'x';

  const iframe = document.createElement('iframe');
    iframe.className = 'github-chat-extension__frame';
    iframe.src = buildChatUrl(chatUrl);
    iframe.title = 'GitHub Chat';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.setAttribute('allow', 'clipboard-read; clipboard-write');

  const fallback = document.createElement('div');
    fallback.className = 'github-chat-extension__fallback';

  const fallbackMessage = document.createElement('p');
    fallbackMessage.textContent = 'This chat endpoint cannot be embedded on GitHub.';

  const fallbackLink = document.createElement('a');
    fallbackLink.className = 'github-chat-extension__fallback-link';
    fallbackLink.href = buildChatUrl(chatUrl);
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    fallbackLink.textContent = 'Open Chat';

  fallback.append(fallbackMessage, fallbackLink);

  if (useFallback) {
        fallback.classList.add('is-visible');
  }

  const fallbackTimer = window.setTimeout(() => {
        fallback.classList.add('is-visible');
  }, 2500);

  iframe.addEventListener('load', () => {
        if (!useFallback) {
                window.clearTimeout(fallbackTimer);
        }
  });

  function setOpen(isOpen) {
        root.classList.toggle('is-collapsed', !isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
  }

  toggle.addEventListener('click', () => {
        setOpen(root.classList.contains('is-collapsed'));
  });

  close.addEventListener('click', () => {
        setOpen(false);
  });

  header.appendChild(close);
    panel.append(header, fallback, iframe);
    root.append(toggle, panel);
    document.body.appendChild(root);
}

function init() {
    if (document.getElementById(ROOT_ID)) return;

  chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_CHAT_URL }, (items) => {
        createChatFrame(items[STORAGE_KEY] || DEFAULT_CHAT_URL);
  });
}

init();
