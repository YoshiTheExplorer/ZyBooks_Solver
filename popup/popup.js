document.addEventListener('DOMContentLoaded', function () {
    let solveAll = document.getElementById('solveAll');
    let solveAnimations = document.getElementById('solveAnimations');
    let solveMC = document.getElementById('solveMC');

    // Helper function to send messages with retry
    async function sendMessage(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
            const tab = tabs[0];
            if (!tab) {
                console.error('No active tab found');
                return;
            }

            let retries = 0;
            const maxRetries = 3;

            const tryConnect = async () => {
                try {
                    await chrome.tabs.sendMessage(tab.id, { ping: true });
                    // If successful, send the actual message
                    chrome.tabs.sendMessage(tab.id, { message });
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
        });
    }

    if (solveAll) {
        solveAll.addEventListener('click', () => sendMessage("solveAll"));
    }

    if (solveAnimations) {
        solveAnimations.addEventListener('click', () => sendMessage("solveAnimations"));
    }

    if (solveMC) {
        solveMC.addEventListener('click', () => sendMessage("solveMC"));
    }
});