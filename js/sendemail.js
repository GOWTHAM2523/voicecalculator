(function () {
    emailjs.init("hdueE7bUifAPG9EJh"); // Replace with your Public Key
})();


// Example to programmatically show the popup
var myModal = new bootstrap.Modal(document.getElementById('successPopup'));



function sendEmail(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const templateParams = {
        to_name: "gowtham", // Recipient name
        from_name: document.getElementById("name").value, // Sender name
        from_email: document.getElementById("email").value, // Sender email
        message: document.getElementById("message").value, // Message content
        reply_to: document.getElementById("email").value // Reply-to email address
    };

    emailjs.send("service_hiqcowq", "template_b0yggtu", templateParams)
        .then(() => {
            alert("Email Sent Successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to send the email. Check the console for details.");
        });

    document.getElementById("tmContactForm").reset();
}



    
