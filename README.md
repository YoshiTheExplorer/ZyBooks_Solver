# ZyBooks_Solver
 Automatically Solves Your ZyBooks

## How to use

1. Clone the repository
2. Open the extension in Chrome
3. Click the "Complete All on Page" button
4. Click the "Complete Animations" button
5. Click the "Complete Multiple Choice" button

## How it works

The extension uses the Chrome extension API to send messages to the background script, which then uses the Chrome scripting API to execute the solve functions.

The solve functions are located in the scripts/background.js file.

The solve functions are designed to be run in order, but they can be run concurrently if you click the "Complete All on Page" button.
