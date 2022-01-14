import {Button, Container, Stack} from "react-bootstrap";
import AddBudgetModel from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useState } from 'react'
import { UNCATEGIRIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpressModal';
import UncategirizedBudgetCard from "./components/UncategirizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from './components/ViewExpensesModal'

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)  
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets() // Забираем необходимые компоненты из BudgetsContext

  function openAddExpressModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant='outline-primary' onClick={openAddExpressModal}>Add Expense</Button>
        </Stack>
        <div style={{
          display:'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (
            <BudgetCard 
              key={budget.id}
              name={budget.name}
              amount={amount} 
              max={budget.max}
              onAddExpenseClick = {() => openAddExpressModal(budget.id)}
              onViewExpensesClick = {() => setViewExpensesModalBudgetId(budget.id)}
            />
            )
          })}
          <UncategirizedBudgetCard 
            onAddExpenseClick = {openAddExpressModal}
            onViewExpensesClick = {() => setViewExpensesModalBudgetId(UNCATEGIRIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
  
        </div>
      </Container>
      <AddBudgetModel 
        show={showAddBudgetModal} 
        handleClose={() => setShowAddBudgetModal(false)} 
        
      />
      <AddExpenseModal 
        show={showAddExpenseModal} 
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)} 
      />
      <ViewExpensesModal 
        budgetId={viewExpensesModalBudgetId} 
        handleClose={() => setViewExpensesModalBudgetId()} 
      />
    </>
  )
}

export default App;
