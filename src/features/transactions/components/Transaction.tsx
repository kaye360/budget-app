import { ArchiveRestoreIcon, CircleCheckIcon, EllipsisIcon, LoaderCircleIcon, SaveIcon, Trash2Icon, XIcon } from "lucide-react";
import type { Budget, Transaction as TransactionType} from "../../../types/types";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import { actions } from "astro:actions";
import { convertDate } from "../../../lib/convertDate";

interface Props {
    transaction : TransactionType
    budgets : Budget[]
    actionButton : 'edit' | 'restore'
}

export default function Transaction({transaction : initialTransaction, actionButton, budgets} : Props) {

    const [isEditing, setIsEditing] = useState<Boolean>(false)
    const [saveStatus, setSaveStatus] = useState<'initial' | 'saving' | 'saved'>('initial')
    const [deleteStatus, setDeleteStatus] = useState<'initial' | 'deleting' | 'deleted'>('initial')
    const [restoreStatus, setRestoreStatus] = useState<'initial' | 'restoring' | 'restored'>('initial')
    const [transaction, setTransaction] = useState<TransactionType>(initialTransaction)

    const handleSave = async (e : FormEvent) => {
        e.preventDefault()

        setSaveStatus('saving')
        
        const result = await actions.transaction.update({
            id: Number(transaction.id),
            date: String(transaction.date),
            description: String(transaction.description),
            amount: Number(transaction.amount),
            budgetId: transaction.budgetId,
            accountId: 1,
        })

        if( !result.error ) {
            setSaveStatus('saved')
            setTimeout( () => {
                setSaveStatus('initial')
                setIsEditing(false)
            }, 1500)
        }
    }

    const handleDelete = async () => {
        setDeleteStatus("deleting")
        const result = await actions.transaction.destroy({id: Number(transaction.id)})
        if( !result.error ) setDeleteStatus('deleted')
    }

    const handleRestore = async () => {
        setRestoreStatus('restoring')
        const result = await actions.transaction.update({
            isDeleted : false,
            id : Number(transaction.id)
        })
        if( !result.error ) setRestoreStatus('restored')
    }

    const handleEsc = (e: KeyboardEvent<HTMLFormElement>) => {
        if( e.key === 'Escape' ) cancelChangesHandler()
    }

    const cancelChangesHandler = () => {
        if( isEditing ) setTransaction(initialTransaction)
        setIsEditing(false)
    }

    if( 
        deleteStatus === 'deleted' ||
        restoreStatus === 'restored'
    ) return <></>

    return (
        <form 
            onSubmit={handleSave}
            onKeyDown={handleEsc}
            className={`flex flex-wrap md:flex-nowrap items-center gap-y-1 gap-x-2 px-2 py-4 rounded-md transition-opacity ${isEditing ? 'selected' : ''}`}
        >
            { isEditing ? (
                <input 
                    type="date" 
                    name="date"
                    onChange={ (e) => setTransaction({...transaction, date : e.target.value})}
                    defaultValue={transaction.date as string}
                />
            ) : (
                <span className="text-sm text-accent-text min-w-fit">
                    { convertDate(transaction.date).to('MMM-DD-YYYY')}
                </span>
            )}

            { isEditing ? (
                <input 
                    type="text" 
                    name="description" 
                    defaultValue={transaction.description ?? ''} 
                    onChange={ (e) => setTransaction({...transaction, description : e.target.value}) }
                />
            ) : (
                <div className="block font-semibold text-xl md:text-xl rounded w-full md:w-auto">
                    {transaction.description}
                </div>
            )}
            
            { isEditing ? (
                <select 
                    name="budgetId" 
                    className="w-full bg-bg-2"
                    onChange={ (e) => setTransaction({
                        ...transaction, 
                        budgetId : Number(e.target.value),
                        budget : e.target.options[e.target.selectedIndex].text
                    })}
                    defaultValue={transaction.budgetId as number}
                >
                    <option value="0">Uncategorized</option>
                    { budgets.map( budget => (
                        <option value={budget.id}key={budget.id}>
                            {budget.name}
                        </option>
                    ))}
                </select>
            ) : (
                <a 
                    href={`/transactions/budget/${transaction.budgetId}`}
                    className="bg-blue/20 px-2 py-1 text-sm md:text-xs font-medium rounded-sm tracking-wide capitalize flex items-center min-w-fit order-10 md:order-none hover:underline"
                >
                    {transaction.budget}
                </a>
            )}

            { isEditing ? (
                <select name="account" className="w-full bg-bg-2">
                    <option value={1}>
                        Everyday - Chequing 8754
                    </option>
                </select>
            ) : (
                <span className="bg-red/10 px-2 py-1 font-medium rounded-sm tracking-wide text-sm md:text-xs capitalize flex items-center gap-1 min-w-fit order-11 md:order-none">
                    <span>Everyday</span>
                    &#9679;
                    <span>Chequing</span>
                    <span>7854</span>
                </span>
            )}

            { isEditing ? (
                <input 
                    type="text" 
                    name="amount" 
                    defaultValue={transaction.amount ?? 0} 
                    className="w-24 shrink-0" 
                    onChange={ (e) => setTransaction({...transaction, amount : Number(e.target.value)}) }
                />
            ) : (
                <span className="ml-auto text-xl font-semibold font-theme w-full md:w-auto">
                    {transaction.amount}
                </span>
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
                        onClick={handleDelete}
                    >
                        <Trash2Icon className="w-[24px] h-[24px]  hover:stroke-red cursor-pointer" />
                    </button>
                </>
            )}

            { actionButton === 'edit' && isEditing &&
                <button 
                    type="button"
                    className="order-last group cursor-pointer transition-all active:scale-95"
                    onClick={cancelChangesHandler}
                    title="Cancel Editing"
                >
                    <XIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors" />
                </button>
            }

            { actionButton === 'edit' && !isEditing &&
                <button 
                    type="button"
                    className="order-last group cursor-pointer transition-all active:scale-95 ml-auto md:ml-0"
                    onClick={ () => setIsEditing(true) }
                    title="Edit Transaction"
                >
                    <EllipsisIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors" />
                </button>
            }

            { actionButton === 'restore' && (
                <button 
                    type="button"
                    className="ml-2 group cursor-pointer transition-all active:scale-95 order-last"
                    title="Restore Transaction"
                    onClick={handleRestore}
                >
                    <ArchiveRestoreIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors" />
                </button>
            )}

        </form>
    )
}