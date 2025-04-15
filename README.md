# ZyBooks_Solver (BETA)
 Automatically Solves Your ZyBooks

## How to use

1. Clone the repository
2. Set up & open the extension in Chrome like any custom extension (chrome://extensions/)
3. Start autocompleting zybooks!

# Currently, only supports autocomplete for Animations, Multiple Choice, and Short Answer questions

## How it works

The extension uses the Chrome extension API to send messages to the background script, which then uses the Chrome scripting API to execute the solve functions.

The solve functions are located in the scripts/background.js file.

The solve functions are designed to be run in order, but they can be run concurrently if you click the "Complete All on Page" button.
