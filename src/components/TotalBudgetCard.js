import React from 'react'
import { UNCATEGIRIZED_BUDGET_ID } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'
import { useBudgets } from './../contexts/BudgetsContext';

export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets()

    const amount = expenses.reduce((total, expense) => total + expense.amount, 0)

    const max = budgets.reduce((total, budgets) => total + budgets.max, 0)

    if (max ===0) return null

    return <BudgetCard amount={amount} name="Total" grey max={max} hideButtons/>
}
