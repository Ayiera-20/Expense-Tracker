// Fetch expenses from the backend API
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/expenses');
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        const expenses = await response.json();

        const tableBody = document.getElementById('expenses-table-body');
        tableBody.innerHTML = ''; // Clear any existing rows

        // Iterate over the expenses and create rows dynamically
        expenses.forEach(expense => {
            const row = document.createElement('tr');

            // Convert the date to a more readable format (yyyy-mm-dd)
            const formattedDate = new Date(expense.date).toISOString().split('T')[0];  // Splitting to remove the time

            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${expense.category_name}</td>
                <td>${expense.amount}</td>
                <td>${expense.payment_method_name}</td>
                <td>${expense.description}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
