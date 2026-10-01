// login.js
document.addEventListener('DOMContentLoaded', () => {
    // If already logged in, redirect to dashboard
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }

    const form = document.getElementById('login-form');
    const alertBox = document.getElementById('login-alert');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (user === 'admin' && pass === 'himatif123') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alertBox.textContent = 'Username atau password salah.';
            alertBox.classList.remove('d-none');
        }
    });
});
