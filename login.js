// Generate valid roll numbers from 23B81A3201 to 23B81A3264
const validRollNumbers = Array.from({length: 64}, (_, i) => {
    const number = (i + 1).toString().padStart(2, '0');
    return `23B81A32${number}`;
});

// Form Submission Handler
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const rollNumber = document.getElementById('rollnumber').value;
    const password = document.getElementById('password').value;

    // Check if roll number is valid and password matches
    if (validRollNumbers.includes(rollNumber) && password === rollNumber) {
        // Store the logged-in user's roll number
        localStorage.setItem('loggedInUser', rollNumber);
        // Redirect to next page
        window.location.href = 'rfp.html';
    } else {
        // Show error alert for invalid credentials
        alert('Invalid roll number or password. Please try again.');
    }
});

// Password Visibility Toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle the eye icon
    const icon = this.querySelector('i');
    icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});
