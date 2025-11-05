// Theme Switcher Functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', currentTheme === 'dark');
updateThemeIcon();

// Theme toggle function
function toggleTheme() {
    body.classList.toggle('dark-theme');
    
    // Save theme preference
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    updateThemeIcon();
}

// Update theme icon
function updateThemeIcon() {
    if (themeIcon) {
        themeIcon.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
    }
}

// Add event listener if button exists
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}
