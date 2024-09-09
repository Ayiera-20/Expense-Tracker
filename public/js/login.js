// Login
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#login-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const authMsg = document.getElementById('auth-msg');

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json(); 

                if (!response.ok) {
                    authMsg.textContent = data.message || 'Authentication failed';
                } else {
                    authMsg.textContent = data.message || 'Login successful';
                    window.location.href = '/home';
                }
            } catch (err) {
                if (authMsg) {
                    authMsg.textContent = 'Error: ' + err.message;
                }
            }
        });
    } else {
        console.error('Login form element not found in the DOM');
    }
});



