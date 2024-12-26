// Initialize emailjs
(function () {
    emailjs.init("hdueE7bUifAPG9EJh"); // Replace with your Public Key
})();

// Example to programmatically show the popup
const successPopup = document.getElementById('successPopup');
const myModal = successPopup ? new bootstrap.Modal(successPopup) : null;

// Function to send email
function sendEmail(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Template parameters for emailjs
    const templateParams = {
        to_name: "gowtham", // Recipient name
        from_name: name, // Sender name
        from_email: email, // Sender email
        message: message, // Message content
        reply_to: email // Reply-to email address
    };

    // Send email using emailjs
    emailjs.send("service_hiqcowq", "template_b0yggtu", templateParams)
        .then(() => {
            // Show success popup or alert
            if (myModal) {
                myModal.show();
            } else {
                alert("Email Sent Successfully!");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to send the email. Check the console for details.");
        });

    // Reset the form
    document.getElementById("tmContactForm").reset();
}
