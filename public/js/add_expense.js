document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-expense-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;
        const paymentMethod = document.getElementById('Payment').value;
        const description = document.getElementById('description').value;

        const expenseData = {
            date,
            category,
            amount,
            paymentMethod,
            description,
        };

        try {
            const response = await fetch('/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expenseData)
            });

            if (response.ok) {
                alert('Expense added successfully!');
                window.location.href = '/view_expense';
                form.reset();
            } else {
                alert('Failed to add expense.');
            }
        } catch (err) {
            console.error('Error adding expense:', err);
            alert('An error occurred.');
        }
    });
});
