import React from 'react'
import { UNCATEGIRIZED_BUDGET_ID } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'
import { useBudgets } from './../contexts/BudgetsContext';

export default function UncategirizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGIRIZED_BUDGET_ID)
        .reduce((total, expense) => total + expense.amount, 0)

    if (amount ===0) return null

    return <BudgetCard amount={amount} name="Uncategirized" grey {...props}/>
}
