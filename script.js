document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to handle validation

    // Get values from the input fields
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Reset error messages
    resetErrors();
    resetConfirmationMessage(); // Reset confirmation message

    let isValid = true;
    let firstErrorElement = null; // To keep track of the first input with an error

    // Validate Full Name
    if (fullName.length < 5) {
        showError('nameError');
        isValid = false;
        firstErrorElement = document.getElementById('fullName'); // Store the first error element
    }

    // Validate Email ID
    if (!validateEmail(email)) {
        showError('emailError');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('email');
    }

    // Validate Phone Number
    if (!validatePhone(phone)) {
        showError('phoneError');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('phone');
    }

    // Validate Password
    if (!validatePassword(password, fullName)) {
        showError('passwordError');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('password');
    }

    // Confirm Password Match
    if (password !== confirmPassword) {
        showError('confirmPasswordError');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = document.getElementById('confirmPassword');
    } else {
        // If passwords match, show confirmation message
        showConfirmationMessage();
    }

    // If valid, submit the form (you can replace this with your actual form submission logic)
    if (isValid) {
        alert('Form submitted successfully!');
        clearForm(); // Clear the form fields after successful submission
    } else if (firstErrorElement) {
        firstErrorElement.focus(); // Focus on the first element with an error
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Smoothly scroll to the error
    }
});

// Function to validate email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    return emailPattern.test(email);
}

// Function to validate phone number
function validatePhone(phone) {
    const phonePattern = /^[0-9]{10}$/; // Regex for 10-digit phone number
    return phonePattern.test(phone) && phone !== '1234567890';
}

// Function to validate password
function validatePassword(password, fullName) {
    return password.length >= 8 && password !== 'password' && password !== fullName;
}

// Function to show error messages
function showError(errorId) {
    document.getElementById(errorId).classList.add('active'); // Show specific error message
}

// Function to reset all error messages
function resetErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.classList.remove('active'); // Hide error messages
    });
}

// Function to clear the form fields
function clearForm() {
    document.getElementById('registrationForm').reset(); // Resets all form fields to their initial values
    resetErrors(); // Also reset error messages
    resetConfirmationMessage(); // Clear the confirmation message
}

// Function to show confirmation message
function showConfirmationMessage() {
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.classList.add('active'); // Show confirmation message
    confirmationMessage.textContent = "Passwords match."; // Set confirmation message text
}

// Function to reset the confirmation message
function resetConfirmationMessage() {
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.classList.remove('active'); // Hide confirmation message
    confirmationMessage.textContent = ""; // Clear the message text
}
