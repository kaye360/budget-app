import { useState } from "react"
import Budget from "./Budget"
import type { Budget as BudgetSchema } from "../schema/budget.schema"

interface Props {
    budgets : BudgetSchema[]
}

export default function BudgetList({
    budgets : initialBudgets = []
} : Props) {

    const [budgets, setBudgets] = useState<Props['budgets']>(initialBudgets)

    return (
        <div 
            id="budget-list"
            className="grid gap-6 text-lg w-full [&:has(.selected)]:[&_form:not(.selected)]:opacity-20 [&_form]:opacity-100 [&_form]:transition-opacity"
        >
            {budgets.toSorted().map( budget => (
                <Budget budget={budget} key={budget.id} />
            ))}
        </div>
    )
}