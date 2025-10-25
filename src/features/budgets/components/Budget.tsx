import { CircleCheckIcon, EllipsisVerticalIcon, LoaderCircleIcon, SaveIcon, Trash2Icon, XIcon } from "lucide-react"
import type { BudgetWithTotalSpent } from "../budget.utils"
import { useState, type FormEvent, type KeyboardEvent } from "react"
import { actions } from "astro:actions"
import { sleep } from "../../app/app.utils"

interface Props {
    budget : BudgetWithTotalSpent
}

export default function Budget({
    budget : initialBudget
} : Props) {

    const [budget, setBudget] = useState<BudgetWithTotalSpent>(initialBudget)
    const [isEditing, setIsEditing] = useState(false)
    const [saveStatus, setSaveStatus] = useState<'initial' | 'saving' | 'saved'>('initial')
    const [deleteStatus, setDeleteStatus] = useState<'initial' | 'deleting' | 'deleted'>('initial')

    const handle = {

        delete : async () => {
            setDeleteStatus('deleting')
            const response = await actions.budget.destroy({id : budget.id})
            if( !response.error ) {
                setDeleteStatus('deleted')
            }
        },

        cancel : () => {
            if( isEditing ) setBudget(initialBudget)
            setIsEditing(false)
        },

        esc : (e: KeyboardEvent<HTMLFormElement>) => {
            if( e.key === 'Escape' ) handle.cancel()
        },

        save : async (e: FormEvent) => {
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
            onSubmit={handle.save}
            onKeyDown={handle.esc}
            // Apply darker bg and border styles to progress bar children 
            className={`
                relative rounded-sm flex items-center gap-2 justify-between px-4 py-2 font-semibold
                nth-[5n+1]:bg-blue/10 [&:nth-child(5n+1)_span.progress-bar]:bg-blue/20 [&:nth-child(5n+1)_span.progress-bar]:border-blue/50
                nth-[5n+2]:bg-green/10 [&:nth-child(5n+2)_span.progress-bar]:bg-green/20 [&:nth-child(5n+2)_span.progress-bar]:border-green/50
                nth-[5n+3]:bg-purple/10 [&:nth-child(5n+3)_span.progress-bar]:bg-purple/20 [&:nth-child(5n+3)_span.progress-bar]:border-purple/50
                nth-[5n+4]:bg-red/10 [&:nth-child(5n+4)_span.progress-bar]:bg-red/20 [&:nth-child(5n+4)_span.progress-bar]:border-red/50
                nth-[5n]:bg-orange/10 [&:nth-child(5n)_span.progress-bar]:bg-orange/20 [&:nth-child(5n)_span.progress-bar]:border-orange/50
                ${isEditing ? 'selected' : ''}
            `}
        >
            { isEditing ? (
                <input 
                    type="text"
                    className="max-w-[300px]"
                    defaultValue={budget.name}
                    onChange={ e => setBudget({...budget, name : e.target.value})}
                />
            ) : (
                <a href={`/budget/${budget.id}`} className="hover:underline">
                    {budget.name}
                </a>
            )}

            <span className="text-2xl ml-auto min-w-fit flex gap-2">
                <span className="min-w-fit">
                    {Math.round(budget.totalSpent)}
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
                        onClick={handle.delete}
                    >
                        <Trash2Icon className="w-[24px] h-[24px]  hover:stroke-red cursor-pointer" />
                    </button>
                    <button 
                        type="button"
                        onClick={ () => setIsEditing(false) }
                    >
                        <XIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors hover" />
                    </button>
                </>
            )}

            <span 
                className="absolute left-0 top-0 bottom-0 -z-10 rounded-sm block animate-progress-bar origin-left border progress-bar"
                style={{width : `${budget.percentSpent}%`}}
            />
        </form>
    )
}