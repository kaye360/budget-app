import { CircleCheckIcon, EllipsisVerticalIcon, LoaderCircleIcon, SaveIcon, Trash2Icon, XIcon } from "lucide-react"
import { useState, type FormEvent, type KeyboardEvent } from "react"
import { actions } from "astro:actions"
import { sleep } from "../../app/app.utils"
import type { Budget } from "../schema/budget.schema"

interface Props {
    budget : Budget
}

export default function Budget({
    budget : initialBudget
} : Props) {

    const [budget, setBudget] = useState<Budget>(initialBudget)
    const [isEditing, setIsEditing] = useState(false)
    const [saveStatus, setSaveStatus] = useState<'initial' | 'saving' | 'saved'>('initial')
    const [deleteStatus, setDeleteStatus] = useState<'initial' | 'deleting' | 'deleted'>('initial')

    const handlers = {

        handleDelete : async () => {
            setDeleteStatus('deleting')
            const response = await actions.budget.destroy({id : budget.id})
            if( !response.error ) {
                setDeleteStatus('deleted')
            }
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
            setSaveStatus('saving')
            const response = await actions.budget.update({...budget})

            if( !response.error ) {
                setSaveStatus('saved')
                await sleep(1500)
                setSaveStatus('initial')
                setIsEditing(false)
            }
        }
    }

    if( deleteStatus === 'deleted' ) {
        return <></>
    }

    return (
        <form
            onSubmit={handlers.handleSave}
            onKeyDown={handlers.handleEsc}
            className={` relative rounded-sm flex items-center gap-2 justify-between px-4 py-2 font-semibold budget-progress-bar ${isEditing ? 'selected' : ''} `}
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
                <button
                    onClick={ () => setIsEditing(true) }
                >
                    <EllipsisVerticalIcon className="text-base-text/60 hover:text-red"/>
                </button>
            )}

            { isEditing && (
                <>
                    <button 
                        type="submit"
                        className="shrink-0 ml-auto md:ml-0 active:scale-90"
                        disabled={saveStatus !== 'initial'}
                        title="Save Changes"
                    >
                        { saveStatus === 'initial' && (
                            <SaveIcon className="w-[24px] h-[24px] hover:stroke-red cursor-pointer" />
                        )}
                        { saveStatus === 'saving' && (
                            <LoaderCircleIcon className="w-[24px] h-[24px] animate-spin" />
                        )}
                        { saveStatus === 'saved' && (
                            <CircleCheckIcon className="w-[24px] h-[24px]" />
                        )}
                    </button>
                    <button 
                        type="button"
                        className=" shrink-0 active:scale-90"
                        title="Hide Transaction"
                        onClick={handlers.handleDelete}
                    >
                        <Trash2Icon className="w-[24px] h-[24px]  hover:stroke-red cursor-pointer" />
                    </button>
                    <button 
                        type="button"
                        onClick={ () => setIsEditing(false) }
                        title="Cancel edit"
                    >
                        <XIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors hover" />
                    </button>
                </>
            )}

            <span 
                className="absolute left-0 top-0 bottom-0 -z-10 rounded-sm block animate-progress-bar origin-left border progress-bar"
                style={ budget.percentSpent
                    ? { width : `${budget.percentSpent}%`}
                    : { width : '0%' }
                }
            />
        </form>
    )
}