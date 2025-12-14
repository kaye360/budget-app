import { Trash2Icon } from "lucide-react"
import { useState, type FormEvent, type KeyboardEvent } from "react"
import { actions } from "astro:actions"
import { sleep } from "../../app/app.utils"
import type { Budget } from "../schema/budget.schema"
import { LoadingButton, useLoadingButtonStatus } from "../../../components/Button/LoadingButton.tsx"
import CancelButton from "../../../components/Button/CancelButton.tsx"
import EditButton from "../../../components/Button/EditButton.tsx"

interface Props {
    budget : Budget
}

export default function Budget({
    budget : initialBudget
} : Props) {

    const [budget, setBudget] = useState<Budget>(initialBudget)
    const [isEditing, setIsEditing] = useState(false)

    const saveStatus = useLoadingButtonStatus()
    const deleteStatus = useLoadingButtonStatus()

    const handlers = {

        handleDelete : async () => {
            deleteStatus.setAsLoading()

            const response = await actions.budget.destroy({id : budget.id})

            if( response.error ) {
                deleteStatus.setAsInitial()
                throw new Error(response.error.message)
            }

            deleteStatus.setAsComplete()
        },

        handleCancel : () => {
            if( isEditing ) setBudget(initialBudget)
            setIsEditing(false)
        },

        handleEsc : (e: KeyboardEvent<HTMLFormElement>) => {
            if( e.key === 'Escape' ) handlers.handleCancel()
        },

        handleSave : async (e: FormEvent) => {
            e.preventDefault()

            saveStatus.setAsLoading()

            const response = await actions.budget.update({...budget})

            if( response.error ) {
                saveStatus.setAsInitial()
                throw new Error(response.error.message)
            }

            saveStatus.setAsComplete()
            await sleep(1000)
            setIsEditing(false)
        }
    }

    if( deleteStatus.isComplete() ) {
        return <></>
    }

    return (
        <form
            onSubmit={handlers.handleSave}
            onKeyDown={handlers.handleEsc}
            className={` relative rounded-sm flex items-center gap-2 justify-between pt-2 pb-4 font-semibold budget-progress-bar ${isEditing ? 'selected' : ''} `}
        >
            { isEditing ? (
                <input 
                    type="text"
                    className="max-w-[300px]"
                    defaultValue={budget.name}
                    onChange={ e => setBudget({...budget, name : e.target.value})}
                />
            ) : (
                <a href={`/budgets/budget/${budget.id}`} className="hover:underline">
                    {budget.name}
                </a>
            )}

            <span className="text-2xl ml-auto min-w-fit flex gap-2">
                <span className="min-w-fit">
                    {Math.round(budget.totalSpent ?? 0)}
                </span>
                <span>
                    /
                </span>
                { isEditing ? (
                    <input 
                        type="text"
                        className="w-full max-w-14"
                        defaultValue={budget.amount}
                        onChange={ e => setBudget({...budget, amount : Number(e.target.value)}) }
                    />
                ) : (
                    <>
                        {Math.round(budget.amount)}
                    </>
                )}
            </span>

            { !isEditing && (
                <EditButton onClick={ () => setIsEditing(true) } />
            )}

            { isEditing && (
                <>
                    <LoadingButton 
                        state={saveStatus} 
                        type="submit" 
                        title="Save Budget"
                    />
                    <LoadingButton 
                        icon={Trash2Icon} 
                        state={deleteStatus} 
                        onClick={handlers.handleDelete}
                        title="Delete Budget"
                    />
                    <CancelButton onClick={ () => setIsEditing(false) } title="Cancel Edit" />
                </>
            )}

            <span 
                className="absolute left-0 bottom-0 h-[15px] -z-10 rounded-lg px-4 block animate-progress-bar origin-left progress-bar"
                style={ budget.percentSpent
                    ? { width : `${budget.percentSpent}%`}
                    : { width : '0%' }
                }
            />
        </form>
    )
}