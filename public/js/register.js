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

            console.log(response);  

            if (!response.ok) {
                const errorData = await response.json(); 
                console.log(errorData);  
                authMsg.textContent = "User already exists or other error!";
            } else {
                const data = await response.json();  
                console.log(data); 

                authMsg.textContent = "User created successfully!";
                setTimeout(() => {
                    window.location.href = '/login'; 
                }, 2000); 
            }
        } catch (err) {
            console.error('An error occurred:', err);  // Log the error to the console
            authMsg.textContent = 'An error occurred';
        }
    });
});
