// Listen for messages from the popup
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // Handle ping message
        if (request.ping) {
            sendResponse({ pong: true });
            return true;
        }

        switch (request.message) {
            case "solveAll":
                solveAllQuestions();
                break;
            case "solveAnimations":
                solveAnimations();
                break;
            case "solveMC":
                solveMultipleChoice();
                break;
        }
        // Return true to indicate you want to send a response asynchronously
        return true;
    }
);

function solveAllQuestions() {
    console.log("Starting to solve all questions...");
    solveAnimations();
    solveMultipleChoice();
}

function solveAnimations() {
    console.log("Starting animation solver...");

    // Find all animation containers
    const animationContainers = document.querySelectorAll('.animation-player');
    console.log(`Found ${animationContainers.length} animation containers`);

    animationContainers.forEach((container, index) => {
        // Find the start button within this container
        const startButton = container.querySelector('button.start-button:not([disabled])');
        const speedControl = container.querySelector('.speed-control input[type="checkbox"]');

        if (startButton) {
            console.log(`Processing animation ${index + 1}`);

            // Click speed checkbox if it exists and isn't checked
            if (speedControl && !speedControl.checked) {
                speedControl.click();
                console.log('Enabled speed control');
            }

            // Add a small delay before clicking start
            setTimeout(() => {
                startButton.click();
                console.log('Clicked start button');
            }, 100);
        } else {
            console.log(`No active start button found for animation ${index + 1}`);
        }
    });

    // Backup check for any animations we might have missed
    setTimeout(() => {
        const remainingButtons = document.querySelectorAll('button.start-button:not([disabled])');
        if (remainingButtons.length > 0) {
            console.log(`Found ${remainingButtons.length} remaining animations, processing...`);
            remainingButtons.forEach(button => {
                const container = button.closest('.animation-player');
                const speedControl = container?.querySelector('.speed-control input[type="checkbox"]');

                if (speedControl && !speedControl.checked) {
                    speedControl.click();
                }
                button.click();
            });
        }
    }, 1000);
}

function solveMultipleChoice() {
    // Find all MC questions and select correct answers
    const mcQuestions = document.querySelectorAll('.multiple-choice-question');
    // Add logic to handle MC questions
    console.log("Solving multiple choice...");
}