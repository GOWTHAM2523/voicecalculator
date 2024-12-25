function appendValue(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

function showVoiceCommandPopup() {
    const modal = new bootstrap.Modal(document.getElementById('voiceCommandModal'));
    modal.show();
}

function closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('voiceCommandModal'));
    modal.hide();
}

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

        const display = document.getElementById('display');

        if (command.includes('=')) {
            command = command.replace('=', '');
            display.value = command;
            calculateResult();
        } else {
            appendValue(command);
        }
    };

    recognition.onerror = (event) => {
        alert('Voice recognition error: ' + event.error);
    };
}


const texts = ["Speak and calculate", "Smart calculator"]; // Array of texts to display
    const displayElement = document.getElementById("display");
    let textIndex = 0;
    let charIndex = 0;

    function typeText() {
        if (charIndex < texts[textIndex].length) {
            displayElement.placeholder = texts[textIndex].substring(0, charIndex + 1) + " |";
            charIndex++;
            setTimeout(typeText, 100); // Adjust typing speed here
        } else {
            setTimeout(() => {
                charIndex = 0;
                textIndex = (textIndex + 1) % texts.length; // Loop through texts
                typeText();
            }, 2000); // Delay before showing the next text
        }
    }

    typeText(); // Start the typing animation