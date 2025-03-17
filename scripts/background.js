// Listen for messages from the popup
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // Handle ping message
        if (request.ping) {
            sendResponse({ pong: true });
            return;
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
            case "solveSA":
                solveShortAnswers();
                break;
        }

        sendResponse({ message: "finished" });
        return;
    }
);

function solveAllQuestions() {
    console.log("Starting to solve all questions...");
    solveAnimations();
    solveMultipleChoice();
    solveShortAnswers();
}

function solveAnimations() {
    console.log("Starting animation solver...");

    // Find all animation containers
    const animationContainers = document.querySelectorAll('.animation-controls');
    console.log(`Found ${animationContainers?.length} animation containers`);

    animationContainers?.forEach((container, index) => {
        // Find the start button within this container
        const startButton = container.querySelector('button.start-button:not([disabled])');
        const speedControl = container.querySelectorAll('.speed-control .zb-checkbox input[type="checkbox"]')[0];

        if (startButton) {
            console.log(`Processing animation ${index + 1}`);

            // Click speed checkbox if it exists and isn't checked
            if (speedControl && !speedControl.checked) {
                speedControl.click();
                console.log('Successfully sped up this animation');
            } else {
                console.log(speedControl ? 'Already sped up' : 'or already clicked');
            }

            // Add a small delay before clicking start -- doesnt seem necessary
            // setTimeout(() => {
            startButton.click();
            console.log('Successfully started button');
            // }, 100);
        } else {
            console.log(`No active start button found for animation ${index + 1}`);
        }
    });

    // Backup check for any animations we might have missed
    setTimeout(() => {
        const remainingButtons = document.querySelectorAll('button.start-button:not([disabled])');
        if (remainingButtons?.length > 0) {
            console.log(`Found ${remainingButtons.length} remaining animations, processing...`);
            remainingButtons.forEach(button => {
                const speedControl = document.querySelectorAll('input[type="checkbox"]')[0];
                if (speedControl && !speedControl.checked) {
                    speedControl.click();
                    console.log('Successfully sped up this animation');
                } else {
                    console.log(speedControl ? 'Already sped up' : 'or already clicked');
                }
                button.click();
            });
        }
    }, 1000);

    // Keep checking and clicking play buttons until all animations are complete
    const checkInterval = setInterval(() => {
        // This resets to 0 each interval... it's within the local scope bro
        let count = 0;

        /**
         * Speed control already checked, not necessary to try again every time we continue animation
         */
        // const speedControl = document.querySelectorAll('input[type="checkbox"]')[0];
        // if (speedControl && !speedControl.checked) {
        //     speedControl.click();
        //     console.log('Successfully sped up this animation');
        // } else {
        //     console.log(speedControl ? 'Already sped up' : 'or already clicked');
        // }

        const playButtons = document.querySelectorAll('button.normalize-controls[aria-label="Play"]');
        const pauseButtons = document.querySelectorAll('button.normalize-controls[aria-label="Pause"]');
        let allComplete = true;

        if (count < 10) {
            allComplete = false;
        }

        playButtons.forEach(button => {
            const playButtonDiv = button.querySelector('.play-button');
            if (!playButtonDiv.classList.contains('rotate-180')) {
                allComplete = false;
                // Click the play button if animation isn't complete
                button.click();
                console.log('Clicking play button to continue animation...');
            }
        });

        if (pauseButtons.length > 0) {
            allComplete = false;
        }

        if (allComplete) {
            console.log('All animations completed');
            clearInterval(checkInterval);
        }

        count++;

    }, 500);
}

function solveMultipleChoice() {
    console.log("Solving multiple choice...");
    // Find all MC questions and select correct answers
    const MCQs = document.querySelectorAll('.multiple-choice-question');

    MCQs.forEach((MCQ, index) => {
        console.log(`Answering question ${index + 1}`);
        const choices = MCQ.querySelectorAll("input[type='radio']");
        let done;
        let i = 0;
        const checkChoices = setInterval(() => {
            console.log(`Checking choice ${i+1}`);
            done = MCQ.querySelector(".question + div + div > div[aria-label='Question completed']");
            if (done || i >= choices.length) {
                console.log(done ? 'Question completed' : 'All choices checked');
                clearInterval(checkChoices);
                return;
            }
            choices[i++].click();
        }, 100);
    });
}

function solveShortAnswers() { //TODO: Implement this
    console.log("Solving short answers...");
    // Find all MC questions and select correct answers
    const SAQs = document.querySelectorAll('.short-answer-question');

    SAQs.forEach((SAQ, index) => {
        console.log(`Answering question ${index + 1}`);
        const showAnswer = SAQ.querySelector(".show-answer-button");
        const answerBox = SAQ.querySelector(".ember-text-area");
        if (showAnswer) {
            showAnswer.click();
            showAnswer.click();
        } else {
            console.log(`FATAL: No show answer button for question ${index + 1}`);
            answerBox.value = 'No "Show Answer"?';
        }
    });

    // Wait for answers and fill
    setTimeout(() => {
        SAQs.forEach((SAQ, index) => {
            const answerBox = SAQ.querySelector(".ember-text-area");
            const checkButton = SAQ.querySelector(".check-button");
            const answer = SAQ.querySelector(".forfeit-answer").textContent;
            // console.log(`Question ${index + 1} answer: ${answer}`);
            answerBox.value = answer;
            answerBox.dispatchEvent(new Event('input', { bubbles: true }));
            setTimeout(() => checkButton.click(), 50);
        });
    }, 50);
}

function solveChallenge() { //TODO: Implement this
    /*
    Maybe use chatGPT to solve the challenge questions
    Take screenshot of the challenge question and send it to chatGPT?
    Later: Only allow premium users to access this
    */

    // Find all challenge questions and select correct answers
    const challengeQuestions = document.querySelectorAll('.challenge-question');
    // Add logic to handle challenge questions
    console.log("Solving challenge...");
}
