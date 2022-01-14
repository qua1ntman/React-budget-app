import { Modal, Button, Stack } from 'react-bootstrap'
import { UNCATEGIRIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';
import { currencyFormatter } from './../utils';


export default function ViewExpensesModal({budgetId, handleClose}) {

    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets() // Забираем необходимые компоненты из BudgetsContext

    const expenses =  getBudgetExpenses(budgetId) 

    const budget = UNCATEGIRIZED_BUDGET_ID === budgetId 
        ? {name: 'Uncategorized', id: UNCATEGIRIZED_BUDGET_ID } 
        : budgets.find(b => b.id === budgetId)

    return (
        <Modal show={budgetId !== undefined} onHide={handleClose} >

                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction='horizontal' gap='2'>
                            <div>Expenses - {budget?.name}</div>
                            {budgetId !== UNCATEGIRIZED_BUDGET_ID && (
                                <Button 
                                    onClick={() => {
                                        deleteBudget(budget)
                                        handleClose()
                                    }} 
                                    variant='outline-danger'
                                >
                                    Delete
                                </Button> // Покажет кнопку, если budgetId !== UNCATEGIRIZED_BUDGET_ID, то есть в UNCATEGIRIZED кнопки не будет
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='vertical' gap="3">
                        {expenses.map (expense => (
                            <Stack direction='horizontal' gap='2' key={expense.id}>
                                <div className='me-auto fs-4'>{expense.description}</div>
                                <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
                                <Button onClick={() => deleteExpense(expense)} size='sm' variant='outline-danger'
                                    >&times;
                                </Button>
                            </Stack>
                        ))}
                    </Stack>
                </Modal.Body>

        </Modal>
    )
}

 

