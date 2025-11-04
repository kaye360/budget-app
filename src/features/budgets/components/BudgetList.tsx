import { useState, type FormEvent } from "react"
import Budget from "./Budget"
import { CreateBudget, type Budget as BudgetSchema } from "../schema/budget.schema"
import { ChartPieIcon, CircleCheckIcon, LoaderCircleIcon, SaveIcon } from "lucide-react"
import { actions } from "astro:actions"
import { getFormData } from "../../app/form.utils"
import { sleep } from "../../app/app.utils"
import { el } from "../../../lib/el"

interface Props {
    budgets : BudgetSchema[]
}

export default function BudgetList({
    budgets : initialBudgets = []
} : Props) {

    const [budgets, setBudgets] = useState<Props['budgets']>(initialBudgets.toSorted())
    const [saveStatus, setSaveStatus] = useState<'initial' | 'saving' | 'saved'>('initial')

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaveStatus('saving')

        const budget = getFormData(e.currentTarget)
        const validated = CreateBudget.parse(budget)
        const response = await actions.budget.store(validated)

        if( response.error ) {
            throw new Error(response.error.message)
        }

        setSaveStatus('saved')
        await sleep(1000)
        setSaveStatus('initial')

        const newBudget = {
            id : response.data[0].id,
            name : response.data[0].name,
            amount : response.data[0].amount,
            userId : response.data[0].userId
        }

        setBudgets( prev => [...prev, newBudget].toSorted((a, b) => a.name.localeCompare(b.name)) )

        el<HTMLInputElement>('input[name=name]', document, input => input.value = '')
        el<HTMLInputElement>('input[name=amount]', document, input => input.value = '')
    }

    return (
        <>
            <div 
                id="budget-list"
                className="grid gap-6 text-lg w-full [&:has(.selected)]:[&_form:not(.selected)]:opacity-20 [&_form]:opacity-100 [&_form]:transition-opacity"
            >
                { budgets.map( budget => (
                    <Budget budget={budget} key={budget.id} />
                ))}
            </div>
            
            <div className="block my-8 p-4 bg-blue/10 rounded-xl">

                <h2 className="font-semibold mb-2">
                    Add a Budget
                </h2>

                <form 
                    id="add-budget-form"
                    className="flex gap-2" 
                    autoComplete="off"
                    onSubmit={handleSave}
                >

                    <input type="text" name="name" required placeholder="Name" />
                    <input type="number" name="amount" required placeholder="Amount"/>

                    <button>
                        {saveStatus === 'initial' && <SaveIcon /> }
                        {saveStatus === 'saving' && <LoaderCircleIcon className="animate-spin" /> }
                        {saveStatus === 'saved' && <CircleCheckIcon /> }
                    </button>
                </form>
            </div>
        </>
    )
}