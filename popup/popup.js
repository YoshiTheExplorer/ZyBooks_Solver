document.addEventListener('DOMContentLoaded', function () {
    let solveAll = document.getElementById('solveAll');
    let solveAnimations = document.getElementById('solveAnimations');
    let solveMC = document.getElementById('solveMC');

    async function executeScript(functionName) {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tab) {
                console.error('No active tab found');
                return;
            }

            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['scripts/background.js']
            });

            // Execute the specific function
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (fn) => {
                    window[fn]();
                },
                args: [functionName]
            });
        } catch (error) {
            console.error('Execution failed:', error);
        }
    }

    if (solveAll) {
        solveAll.addEventListener('click', () => executeScript('solveAllQuestions'));
    }

    if (solveAnimations) {
        solveAnimations.addEventListener('click', () => executeScript('solveAnimations'));
    }

    if (solveMC) {
        solveMC.addEventListener('click', () => executeScript('solveMultipleChoice'));
    }
});