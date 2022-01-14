import { Form, Modal, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { UNCATEGIRIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';


export default function AddExpenseModal({show, handleClose, defaultBudgetId}) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetRef = useRef()
    const { addExpense, budgets } = useBudgets() // Забираем необходимые компоненты из BudgetsContext


    function handleSubmit(e) {
        e.preventDefault()
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetRef.current.value,
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose} >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} type='text' required></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control 
                            ref={amountRef} 
                            type='number' 
                            required 
                            min={0} 
                            step={0.01}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='budgetId'>
                        <Form.Label>Budget</Form.Label>
                        <Form.Select 
                        
                            defaultValue={defaultBudgetId}
                            ref={budgetRef} 
                        >
                            <option id={UNCATEGIRIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map(b => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}

 

