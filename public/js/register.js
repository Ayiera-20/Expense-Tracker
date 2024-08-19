// Registration
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const authMsg = document.getElementById('auth-msg');

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password })
            });

            console.log(response);  // Log the full response object for debugging

            if (!response.ok) {
                const errorData = await response.json(); // Get the error response
                console.log(errorData);  // Log the error details
                authMsg.textContent = "User already exists or other error!";
            } else {
                const data = await response.json();  // Try to parse the response as JSON
                console.log(data);  // Log the data for debugging

                authMsg.textContent = "User created successfully!";
                // Redirect to login page after a delay
                setTimeout(() => {
                    window.location.href = '/login';  // Redirects to the login page
                }, 2000);  // Delay of 2 seconds before redirecting
            }
        } catch (err) {
            console.error('An error occurred:', err);  // Log the error to the console
            authMsg.textContent = 'An error occurred';
        }
    });
});
