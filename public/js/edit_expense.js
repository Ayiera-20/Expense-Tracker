document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('expenses-table-body');

    try {
        const response = await fetch('/api/expenses');
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        const expenses = await response.json();

        tableBody.innerHTML = ''; // Clear any existing rows

        // Iterate over the expenses and create rows dynamically
        expenses.forEach(expense => {
            const row = document.createElement('tr');

            // Store expense_id as a data attribute in the row
            row.dataset.expenseId = expense.expense_id;

            row.innerHTML = `
                <td><input type="date" value="${new Date(expense.date).toISOString().split('T')[0]}" /></td>
                <td><input type="text" value="${expense.category_name}" /></td>
                <td><input type="number" value="${expense.amount}" /></td>
                <td><input type="text" value="${expense.payment_method_name}" /></td>  
                <td><input type="text" value="${expense.description}" /></td>
                <td>
                    <button class="btn btn-save">Save</button>
                    <button class="btn btn-delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);

            // Add event listeners for save and delete buttons
            const saveButton = row.querySelector('.btn-save');
            const deleteButton = row.querySelector('.btn-delete');

            // Update functionality
            saveButton.addEventListener('click', () => {
                const updatedExpense = {
                    date: row.querySelector('input[type="date"]').value,
                    category_name: row.querySelector('input[type="text"]').value,
                    amount: row.querySelector('input[type="number"]').value,
                    payment_method_name: row.querySelector('input[type="text"]').value,
                    description: row.querySelector('input[type="text"]').value,
                };

                const expenseId = row.dataset.expenseId;

                // Use the correct PUT method to update instead of adding
                fetch(`/api/expenses/${expenseId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedExpense),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update expense');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Expense updated successfully!');
                })
                .catch(error => {
                    console.error('Error updating expense:', error);
                });
            });

            // Delete functionality
            deleteButton.addEventListener('click', () => {
                const expenseId = row.dataset.expenseId;

                fetch(`/api/expenses/${expenseId}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete expense');
                    }
                    tableBody.removeChild(row);
                    alert('Expense deleted successfully!');
                })
                .catch(error => {
                    console.error('Error deleting expense:', error);
                });
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

