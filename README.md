 GitHub Chat Extension

 This Chrome extension adds a small chat toggle to the lower-right corner of every `github.com/*` page. Opening the toggle displays GitHub Chat in an iframe when the configured chat endpoint allows embedding, and passes the current GitHub URL as `github_url`.

 ## Install locally

 1. Open `chrome://extensions`.
 2. 2. Enable Developer mode.
    3. 3. Click "Load unpacked".
       4. 4. Select this folder.
          5. 5. Visit any `https://github.com/*` page and click the "Chat" button.
            
             6. ## Configure the chat endpoint
            
             7. The default chat endpoint is `https://github-chat.com/`. That host currently blocks iframe embedding, so the extension shows an "Open Chat" fallback for the default URL. To use an embeddable chat endpoint, open the extension details page, select "Extension options", and save the preferred chat URL.
             8. 
