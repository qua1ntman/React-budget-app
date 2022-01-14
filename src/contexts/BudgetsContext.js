
import React, {useContext} from 'react'
import { v4 } from 'uuid'
import useLocalStorage from './../hooks/useLocalStorage';

const BudgetsContext = React.createContext()

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const UNCATEGIRIZED_BUDGET_ID = "Uncategorized"

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets] = useLocalStorage('budget',[])
    const [expenses, setExpenses] = useLocalStorage('expenses',[])


    function getBudgetExpenses(budgetId) {
        return expenses.filter(e => e.budgetId === budgetId)
    }

    function addExpense({description, amount, budgetId}) {
        
        setExpenses(prevExpense => {
            return [...prevExpense, {id: v4(), description, amount, budgetId}]
        })
    }

    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(b => b.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, {id: v4(), name, max}]
        })
    }

    function deleteBudget({id}) { // but not delete and put in uncategorized
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return {...expense, budgetId: UNCATEGIRIZED_BUDGET_ID}
            })
        })
        setBudgets(prevBudgets => {
            return prevBudgets.filter(b => b.id !== id)
        })
    }

    function deleteExpense({id}) {
        setExpenses(prevExpense => {
            return prevExpense.filter(e => e.id !== id)
        })
    }

    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetsContext.Provider>
}