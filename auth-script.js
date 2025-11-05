// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone Validation
function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && re.test(phone);
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    
    return strength;
}

// Update Password Strength Indicator
function updatePasswordStrength(password, indicatorElement) {
    if (!indicatorElement) return;
    
    const strength = checkPasswordStrength(password);
    
    indicatorElement.className = 'password-strength';
    
    if (password.length === 0) {
        indicatorElement.style.width = '0';
        return;
    }
    
    if (strength <= 2) {
        indicatorElement.classList.add('weak');
    } else if (strength <= 3) {
        indicatorElement.classList.add('medium');
    } else {
        indicatorElement.classList.add('strong');
    }
}

// Show Error Message
function showError(inputId, message) {
    const errorElement = document.getElementById(inputId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.style.borderColor = '#ff4757';
    }
}

// Clear Error Message
function clearError(inputId) {
    const errorElement = document.getElementById(inputId + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
        inputElement.style.borderColor = '#e0e0e0';
    }
}

// Clear All Errors
function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    document.querySelectorAll('input').forEach(input => {
        input.style.borderColor = '#e0e0e0';
    });
}

// Show Success Message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.auth-form');
    form.insertBefore(successDiv, form.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Clear errors on input
    emailInput.addEventListener('input', () => clearError('email'));
    passwordInput.addEventListener('input', () => clearError('password'));
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAllErrors();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;
        
        let isValid = true;
        
        // Validate email
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Add loading state
            const submitButton = loginForm.querySelector('.auth-button');
            submitButton.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                submitButton.classList.remove('loading');
                
                // Store user data (in real app, this would be from server response)
                const userData = {
                    email: email,
                    loginTime: new Date().toISOString()
                };
                
                if (remember) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                
                sessionStorage.setItem('user', JSON.stringify(userData));
                
                showSuccessMessage('Login successful! Redirecting...');
                
                // Redirect to home page
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 1500);
        }
    });
    
    // Load remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const passwordStrengthIndicator = document.getElementById('passwordStrength');
    
    // Clear errors on input
    firstNameInput.addEventListener('input', () => clearError('firstName'));
    lastNameInput.addEventListener('input', () => clearError('lastName'));
    emailInput.addEventListener('input', () => clearError('email'));
    phoneInput.addEventListener('input', () => clearError('phone'));
    passwordInput.addEventListener('input', () => {
        clearError('password');
        updatePasswordStrength(passwordInput.value, passwordStrengthIndicator);
    });
    confirmPasswordInput.addEventListener('input', () => clearError('confirmPassword'));
    termsCheckbox.addEventListener('change', () => clearError('terms'));
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearAllErrors();
        
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const termsAccepted = termsCheckbox.checked;
        
        let isValid = true;
        
        // Validate first name
        if (!firstName) {
            showError('firstName', 'First name is required');
            isValid = false;
        } else if (firstName.length < 2) {
            showError('firstName', 'First name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate last name
        if (!lastName) {
            showError('lastName', 'Last name is required');
            isValid = false;
        } else if (lastName.length < 2) {
            showError('lastName', 'Last name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone
        if (!phone) {
            showError('phone', 'Phone number is required');
            isValid = false;
        } else if (!validatePhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            showError('password', 'Password must be at least 8 characters');
            isValid = false;
        } else if (checkPasswordStrength(password) < 3) {
            showError('password', 'Password is too weak. Use a mix of letters, numbers, and symbols');
            isValid = false;
        }
        
        // Validate confirm password
        if (!confirmPassword) {
            showError('confirmPassword', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }
        
        // Validate terms
        if (!termsAccepted) {
            showError('terms', 'You must accept the terms and conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Add loading state
            const submitButton = signupForm.querySelector('.auth-button');
            submitButton.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                submitButton.classList.remove('loading');
                
                // Store user data (in real app, this would be from server response)
                const userData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    registrationDate: new Date().toISOString()
                };
                
                sessionStorage.setItem('user', JSON.stringify(userData));
                
                showSuccessMessage('Account created successfully! Redirecting to login...');
                
                // Redirect to login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }, 1500);
        }
    });
}

// Social Login Handlers
document.querySelectorAll('.social-button').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        alert(`${provider} login will be implemented with OAuth integration`);
    });
});

// Forgot Password Handler
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Please enter your email address:');
        
        if (email && validateEmail(email)) {
            alert('Password reset link has been sent to your email!');
        } else if (email) {
            alert('Please enter a valid email address.');
        }
    });
}

// Auto-focus first input on page load
document.addEventListener('DOMContentLoaded', function() {
    const firstInput = document.querySelector('.auth-form input:not([type="checkbox"])');
    if (firstInput) {
        firstInput.focus();
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
