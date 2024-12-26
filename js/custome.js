// Append value to the display
function appendValue(value) {
    const display = document.querySelector('#display');
    if (display) {
        display.value += value;
    } else {
        console.error('Display element not found.');
    }
}

// Clear the display
function clearDisplay() {
    const display = document.querySelector('#display');
    if (display) {
        display.value = '';
    } else {
        console.error('Display element not found.');
    }
}

// Calculate the result and speak the answer
function calculateResult() {
    const display = document.querySelector('#display');
    if (display) {
        try {
            // Evaluate the expression
            const result = eval(display.value);
            display.value = result;

            // Speak the result
            speakResult(result);
        } catch (error) {
            display.value = 'Error';
            speakResult('Error in calculation');
        }
    } else {
        console.error('Display element not found.');
    }
}

// Function to speak the result
function speakResult(text) {
    const synth = window.speechSynthesis;
    if (synth) {
        const utterance = new SpeechSynthesisUtterance(text.toString());
        utterance.lang = 'en-US';
        synth.speak(utterance);
    } else {
        console.error('Speech synthesis is not supported in this browser.');
    }
}

// Show voice command modal
function showVoiceCommandPopup() {
    const modalElement = document.querySelector('#voiceCommandModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        console.error('Voice command modal not found.');
    }
}

// Close the modal
function closeModal() {
    const modalElement = document.querySelector('#voiceCommandModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        } else {
            console.error('No active modal instance found.');
        }
    } else {
        console.error('Voice command modal not found.');
    }
}

// Start voice recognition for commands
function startVoiceCommand() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Voice recognition is not supported in your browser.');
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
        let command = event.results[0][0].transcript.trim().toLowerCase();
        command = command.replace(/x|times/g, '*')
            .replace(/plus/g, '+')
            .replace(/minus/g, '-')
            .replace(/divide|by/g, '/')
            .replace(/equals|is equal to|answer/g, '=');

        const display = document.querySelector('#display');

        if (display) {
            if (command.includes('=')) {
                command = command.replace('=', '');
                display.value = command;
                calculateResult();
            } else {
                appendValue(command);
            }
        } else {
            console.error('Display element not found for voice command result.');
        }
    };

    recognition.onerror = (event) => {
        alert('Voice recognition error: ' + event.error);
    };
}


// Typing animation for placeholders in all relevant elements
const texts = ["Speak and calculate", "Smart calculator"]; // Array of texts to display
const displayElements = document.querySelectorAll('[id="display"], [class~="display"]');
let textIndex = 0;
let charIndex = 0;

function typeText() {
    displayElements.forEach(displayElement => {
        if (charIndex < texts[textIndex].length) {
            displayElement.placeholder = texts[textIndex].substring(0, charIndex + 1) + " |";
        } else {
            setTimeout(() => {
                charIndex = 0;
                textIndex = (textIndex + 1) % texts.length; // Loop through texts
            }, 2000); // Delay before showing the next text
        }
    });

    if (charIndex < texts[textIndex].length) {
        charIndex++;
        setTimeout(typeText, 100); // Adjust typing speed here
    } else {
        charIndex = 0;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 2000); // Delay before looping to the next text
    }
}

typeText(); // Start the typing animation






