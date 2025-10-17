import { ArchiveRestoreIcon, EllipsisIcon, SaveIcon, Trash2Icon } from "lucide-react";
import type { Budget, Transaction as TransactionType} from "../../../types/types";
import { useRef, useState } from "react";

interface Props {
    transaction : TransactionType
    budgets : Budget[]
    actionButton : 'edit' | 'restore'
}


export default function Transaction({transaction : initialTransaction, actionButton, budgets} : Props) {

    const [isEditing, setIsEditing] = useState<Boolean>(false)
    const [transaction, setTransaction] = useState<TransactionType>(initialTransaction)

    return (
        <form className="relative flex flex-wrap md:flex-nowrap items-center gap-y-1 gap-x-2 px-2 py-4 rounded-md max-h-[500px]">

            <input type="hidden" name="id" data-bind="id" />

            { isEditing ? (
                <input 
                    type="date" 
                    name="date"
                    onChange={ (e) => setTransaction({...transaction, date : e.target.value})}
                    defaultValue={transaction.date as string}
                />
            ) : (
                <span className="text-sm text-accent-text min-w-fit">
                    {transaction.date}
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
                >
                    <option value="0">Uncategorized</option>
                    { budgets.map( budget => (
                        <option 
                            value={budget.id}
                            selected={budget.id === transaction?.budgetId}
                        >
                            {budget.name}
                        </option>
                    ))}
                </select>
            ) : (
                <div className="bg-blue/20 px-2 py-1 text-sm md:text-xs font-medium rounded-sm tracking-wide capitalize flex items-center min-w-fit order-10 md:order-none">
                    {transaction.budget}
                </div>
            )}

            { isEditing ? (
                <select name="account" className="w-full bg-bg-2">
                    <option 
                        value={1}
                        selected={true}
                    >
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
                    <SaveIcon className="w-[24px] h-[24px] shrink-0 ml-auto md:ml-0" />
                    <Trash2Icon className="w-[24px] h-[24px] shrink-0" />
                </>
            )}


            { actionButton === 'edit' &&
                <button 
                    type="button"
                    className={`order-last group cursor-pointer transition-all active:scale-95 ${!isEditing && 'ml-auto md:ml-0'}`}
                    onClick={ () => {
                        // if( isEditing ) {
                        //     setTransaction(initialTransaction)
                        // } 
                        setIsEditing(!isEditing )
                    }}
                >
                    <EllipsisIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors" />
                </button>
            }

            { actionButton === 'restore' && (
                <div className="order-last">
                    <button 
                        type="button"
                        className="ml-2 group cursor-pointer transition-all active:scale-95"
                    >
                        <ArchiveRestoreIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors" />
                    </button>
                </div>
            )}

        </form>
    )
}