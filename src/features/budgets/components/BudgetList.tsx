import { useState } from "react"
import type { BudgetWithTotalSpent } from "../budget.utils"
import Budget from "./Budget"

interface Props {
    budgets : BudgetWithTotalSpent[]
}

export default function BudgetList({
    budgets : initialBudgets = []
} : Props) {

    const [budgets, setBudgets] = useState<Props['budgets']>(initialBudgets)

    return (
        <div className="grid gap-6 text-lg w-full [&:has(.selected)]:[&_form:not(.selected)]:opacity-20 [&_form]:opacity-100 [&_form]:transition-opacity">
            {budgets.toSorted().map( budget => (
                <Budget budget={budget} key={budget.id} />
            ))}
        </div>
    )
}