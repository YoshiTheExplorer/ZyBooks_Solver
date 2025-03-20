document.addEventListener('DOMContentLoaded', function () {
    let solveAll = document.getElementById('solveAll');
    let solveAnimations = document.getElementById('solveAnimations');
    let solveMC = document.getElementById('solveMC');
    let solveSA = document.getElementById('solveSA');

    // Helper function to send messages with retry
    async function sendMessage(message) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) {
            console.error('No active tab found');
            return;
        }

        // await chrome.scripting.executeScript({
        //     target: { tabId: tab.id },
        //     files: ["scripts/background.js"]
        // }, () => console.log('injected')
        // );

        let retries = 0;
        const maxRetries = 3;

        const tryConnect = async () => {
            try {
                await chrome.tabs.sendMessage(tab.id, { ping: true });
                // If successful, send the actual message
                const resp = await chrome.tabs.sendMessage(tab.id, { message });
                console.log("Resp:");
                console.log(resp);
            } catch (error) {
                if (retries < maxRetries) {
                    retries++;
                    console.log(`Retry attempt ${retries}...`);
                    // Wait 500ms before retrying
                    setTimeout(tryConnect, 500);
                } else {
                    console.error('Failed to connect after multiple attempts');
                }
            }
        };

        await tryConnect();
    };

    solveAll?.addEventListener('click', () => sendMessage("solveAll"));

    solveAnimations?.addEventListener('click', () => sendMessage("solveAnimations"));

    solveMC?.addEventListener('click', () => sendMessage("solveMC"));

    solveSA?.addEventListener('click', () => sendMessage("solveSA"));
});