document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('expenses-table-body');
    try {
        const response = await fetch('/api/get-expenses');
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        const expenses = await response.json();

        tableBody.innerHTML = ''; 

        // Iterate over the expenses and create rows dynamically
        expenses.forEach(expense => {
            const row = document.createElement('tr');

            // Store expense_id as a data attribute in the row
            row.dataset.expenseId = expense.expense_id;
            row.innerHTML = `
                <td><input type="date" data-name='date' value="${new Date(expense.date).toISOString().split('T')[0]}" /></td>
                <td><input type="text" data-name='category_name' value="${expense.category_name}" /></td>
                <td><input type="number" data-name='amount' value="${expense.amount}" /></td>
                <td><input type="text" data-name='payment_method_name' value="${expense.payment_method_name}" /></td>
                <td><input type="text" data-name='description' value="${expense.description}" /></td>
                <td>
                    <button class="btn btn-save">Save</button>
                    <button class="btn btn-delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
            // Add event listeners for save and delete buttons
            row.querySelectorAll('input').forEach((input) => {
                input.addEventListener('change', () => {
                    const updatedValue = input.value;
                    console.log('Updated value **', updatedValue )
                })
            }); 

            const updateButton = row.querySelector('.btn-save')
            const deleteButton = row.querySelector('.btn-delete');

            // Update functionality
            updateButton.addEventListener('click', async () => {

                const expenseId = row.dataset.expenseId;
            
                if (!expenseId) {
                    console.error("Expense ID is undefined");
                    return;
                }
                const updatedExpense = {
                    date: row.querySelector('input[data-name="date"]').value,
                    category_name: row.querySelector('input[data-name="category_name"]').value,
                    amount: row.querySelector('input[data-name="amount"]').value,
                    payment_method_name: row.querySelector('input[data-name="payment_method_name"]').value,
                    description: row.querySelector('input[data-name="description"]').value,
                };
            
                fetch(`/api/update-expense/${expenseId}`, {
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
                .then((data) => {
                    console.log('Response success', data)
                    alert('Expense and payment method updated successfully!');
                })
                .catch(error => {
                    console.error('Error updating expense:', error);
                });
            });
            

// Delete functionality
    deleteButton.addEventListener('click', async () => {
        const expenseId = row.dataset.expenseId;

        if (!expenseId) {
            console.error("Expense ID is undefined");
            return;
        }
        const userConfirmed = confirm("Are you sure you want to delete this expense?");

        if (userConfirmed) {
            try {
                const response = await fetch(`/api/delete-expense/${expenseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete expense');
                }
                tableBody.removeChild(row);
                alert('Expense deleted successfully!');
            } catch (error) {
                console.error('Error deleting expense:', error);
            }
        } else {
            console.log('User canceled the deletion.');
        }
    });
            });
        } catch (error) {
            console.error('Error:', error);
        }    
});


