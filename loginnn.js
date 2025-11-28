document.addEventListener('DOMContentLoaded', () => {
    const pullCord = document.getElementById('pullCord');
    const lamp = document.getElementById('lamp');
    const loginCardContainer = document.getElementById('loginCardContainer');
    const loginButton = document.querySelector('.login-button');
    const forgotLink = document.querySelector('.forgot-link');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Function to handle the toggle logic
    function toggleLightAndForm() {
        const isLampOn = lamp.classList.contains('lamp-on');
        
        // 1. Visually pull the cord
        pullCord.classList.add('pulling');
        
        // 2. Wait for the pull animation to complete (100ms)
        setTimeout(() => {
            pullCord.classList.remove('pulling');
            
            if (isLampOn) {
                // If ON, turn OFF
                lamp.classList.remove('lamp-on');
                // Hide the form first (fade out)
                loginCardContainer.classList.add('is-hidden');
            } else {
                // If OFF, turn ON
                lamp.classList.add('lamp-on');
                // Show the form second (fade in)
                loginCardContainer.classList.remove('is-hidden');
            }
        }, 100);
    }

    // Enhanced authentication function
function handleLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validation checks
    if (!username || !password) {
        showMessage('Please enter both email and password!', 'error');
        return;
    }
    
    // Email format validation
    if (!isValidEmail(username)) {
        showMessage('Please enter a valid email address!', 'error');
        return;
    }
    
    // Password strength validation
    const passwordStrength = checkPasswordStrength(password);
    if (passwordStrength === 'weak') {
        showMessage('Password is too weak! Must be at least 8 characters with letters and numbers.', 'error');
        return;
    }
    
    setTimeout(() => {
        // Change this to your actual dashboard page
        window.location.href = 'home.html';
    }, 2000);
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password strength checker
function checkPasswordStrength(password) {
    if (password.length < 8) return 'weak';
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (hasLetter && hasNumber && hasSpecialChar) return 'strong';
    if (hasLetter && hasNumber) return 'medium';
    return 'weak';
}

// Better message display function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.login-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `login-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        text-align: center;
        font-size: 14px;
        ${type === 'error' ? 'background: #ffebee; color: #c62828; border: 1px solid #f44336;' : ''}
        ${type === 'success' ? 'background: #e8f5e8; color: #2e7d32; border: 1px solid #4caf50;' : ''}
    `;
    
    // Insert message after the login button
    const loginCard = document.querySelector('.login-card');
    const forgotLink = document.querySelector('.forgot-link');
    loginCard.insertBefore(messageDiv,forgotLink);
    
    // Auto remove success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.remove();
        }, 2000);
    }
}

// Forgot password with email validation
function handleForgotPassword() {
    const email = prompt('Please enter your email address to reset password:');
    
    if (email) {
        if (isValidEmail(email)) {
            showMessage(`Password reset link sent to ${email}`, 'success');
            // Here you would typically send an actual email
        } else {
            showMessage('Please enter a valid email address!', 'error');
        }
    }
}


    // Initialize the lamp to the OFF state on load
    lamp.classList.remove('lamp-on'); 
    loginCardContainer.classList.add('is-hidden');

    // Event listeners
    pullCord.addEventListener('click', toggleLightAndForm);
    loginButton.addEventListener('click', handleLogin);
    forgotLink.addEventListener('click', handleForgotPassword);

    // Allow login on Enter key press
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
});