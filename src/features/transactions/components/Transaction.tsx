import { ArchiveRestoreIcon, BanknoteArrowDownIcon, BanknoteArrowUpIcon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { actions } from "astro:actions";
import { convertDate } from "../../../lib/convertDate";
import { sleep, toCurrency } from "../../app/app.utils";
import type { Transaction as TransactionSchema } from "../schema/transaction.schema";
import type { Budget } from "../../budgets/schema/budget.schema";
import type { Account } from "../../settings/accounts.schema";
import { LoadingButton, useLoadingButtonStatus } from '../../../components/Button/LoadingButton.tsx'
import CancelButton from "../../../components/Button/CancelButton.tsx";
import EditButton from "../../../components/Button/EditButton.tsx";

export interface Props {
    transaction : TransactionSchema
    budgets : Budget[],
    accounts : Account[],
    actionButton : 'edit' | 'restore'
}

export default function Transaction({
    transaction : initialTransaction, 
    actionButton, 
    budgets,
    accounts
} : Props) {

    const [isEditing, setIsEditing] = useState<Boolean>(false)
    const [transaction, setTransaction] = useState<TransactionSchema>(initialTransaction)

    const saveStatus = useLoadingButtonStatus()
    const deleteStatus = useLoadingButtonStatus()
    const restoreStatus = useLoadingButtonStatus()

    const budgetInputRef = useRef<HTMLSelectElement>(null)

    // Send focus to budget select element when isEditing === true
    useEffect( () => {
        if( isEditing && budgetInputRef.current ) {
            budgetInputRef.current.focus()
        }
    }, [isEditing] )

    const handlers = {

        handleSave : async (e : FormEvent) => {
            e.preventDefault()
    
            saveStatus.setAsLoading()
            
            const response = await actions.transaction.update({...transaction})

            if( response.error ) {
                saveStatus.setAsInitial()
                throw new Error(response.error.message)
            }
    
            saveStatus.setAsComplete()
            await sleep(1000)
            setIsEditing(false)
        },
    
        handleDelete : async () => {
            deleteStatus.setAsLoading()

            const response = await actions.transaction.destroy({id: Number(transaction.id)})

            if( response.error ) {
                deleteStatus.setAsInitial()
                throw new Error(response.error.message)
            }
            
            deleteStatus.setAsComplete()
        },
    
        handleRestore : async () => {
            restoreStatus.setAsLoading()

            const response = await actions.transaction.update({
                isDeleted : false,
                id : transaction.id
            })

            if( response.error ) {
                restoreStatus.setAsInitial()
                throw new Error(response.error.message)
            }
            
            restoreStatus.setAsComplete()
        },
    
        handleEsc : (e: KeyboardEvent<HTMLFormElement>) => {
            if( e.key === 'Escape' ) handlers.cancelChangesHandler()
        },
    
        cancelChangesHandler : () => {
            if( isEditing ) setTransaction(initialTransaction)
            setIsEditing(false)
        }
        
    }

    if( deleteStatus.isComplete() || restoreStatus.isComplete() ) return (
        <></>
    )

    return (
        <form 
            onSubmit={handlers.handleSave}
            onKeyDown={handlers.handleEsc}
            className={`flex flex-wrap md:flex-nowrap items-center gap-y-1 gap-x-2.5 p-2 rounded-md transition-opacity border border-transparent [&:has(:focus)]:!border-blue ${isEditing ? 'selected' : ''}`}
        >   
            { isEditing ? (
                <input 
                    type="date" 
                    name="date"
                    className="w-28"
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
                <div className="block font-semibold text-md md:text-md rounded w-full md:w-auto">
                    {transaction.description}
                </div>
            )}
            
            { isEditing ? (
                <select 
                    name="budgetId" 
                    className="w-full bg-background-main"
                    ref={budgetInputRef}
                    onChange={ (e) => setTransaction({
                        ...transaction, 
                        budgetId : Number(e.target.value),
                        budget : e.target.options[e.target.selectedIndex].text
                    })}
                    defaultValue={transaction.budgetId as number}
                >
                    <option value="0">Uncategorized</option>
                    { budgets.map( budget => (
                        <option value={budget.id} key={budget.id}>
                            {budget.name}
                        </option>
                    ))}
                </select>
            ) : (
                <a 
                    href={`/transactions/budget/${transaction.budgetId}`}
                    tabIndex={-1}
                    className="bg-blue/20 px-2 py-1 text-sm md:text-xs font-medium rounded-sm tracking-wide capitalize flex items-center min-w-fit order-10 md:order-none hover:underline"
                >
                    {transaction.budget}
                </a>
            )}

            { isEditing ? (
                <select 
                    name="account" 
                    className="w-full bg-background-main" 
                    defaultValue={transaction.accountId ?? ''}
                    onChange={ (e) => setTransaction({
                        ...transaction, 
                        accountId : Number(e.target.value),
                        accountName : e.target.options[e.target.selectedIndex].text
                    })}
                >
                    { accounts.map( account => (
                        <option value={account.id} key={account.id}>
                            {account.name} - {account.number}
                        </option>
                    )) }
                </select>
            ) : (
                <a 
                    href={`/transactions/account/${transaction.accountId}`}
                    className="bg-red/10 px-2 py-1 font-medium rounded-sm tracking-wide text-sm md:text-xs capitalize flex items-center gap-1 min-w-fit order-11 md:order-none hover:underline"
                >
                    { !transaction.accountId
                        ? 'No Account'
                        : `${ transaction.accountName } ● ${ transaction.accountNumber}`
                    }
                </a>
            )}

            { isEditing ? (
                <input 
                    type="text" 
                    name="amount" 
                    defaultValue={transaction.amount} 
                    className="w-16 shrink-0" 
                    onChange={ (e) => setTransaction({...transaction, amount : Number(e.target.value)}) }
                />
            ) : (
                <span className="ml-auto flex items-center gap-1 text-md font-semibold font-theme w-full md:w-auto">
                    { toCurrency(transaction.amount) }
                    { transaction.type === 'spending' && (
                        <BanknoteArrowDownIcon className="stroke-red" size={16} />
                    )}
                    { transaction.type === 'income' && (
                        <BanknoteArrowUpIcon className="stroke-green-500" size={16} />
                    )}
                </span>
            )}

            { isEditing && (
                <div className="border border-blue rounded min-w-max text-sm font-medium md:h-full">
                    <button 
                        type="button"
                        className={`
                            px-2 h-full 
                            ${transaction.type === 'income' ? 'bg-blue text-white' : ''}
                        `}
                        onClick={ () => setTransaction({...transaction, type : 'income'}) }
                    >
                        Income
                    </button>
                    <button 
                        type="button"
                        className={`
                            px-2 h-full 
                            ${transaction.type === 'spending' ? 'bg-blue text-white' : ''}
                        `}
                        onClick={ () => setTransaction({...transaction, type : 'spending'}) }
                    >
                        Spending
                    </button>
                </div>
            )}

            { isEditing && (
                <>
                    <LoadingButton 
                        state={saveStatus} 
                        title="Save Transaction"
                        type="submit"
                    />
                    <LoadingButton
                        state={deleteStatus}
                        icon={Trash2Icon}
                        title="Delete Transaction"
                        onClick={handlers.handleDelete}
                    />
                </>
            )}

            { actionButton === 'edit' && isEditing &&
                <CancelButton 
                    className="order-last group cursor-pointer transition-all active:scale-95"
                    onClick={handlers.cancelChangesHandler}
                    title="Cancel Editing"
                />
            }

            { actionButton === 'edit' && !isEditing &&
                <EditButton
                    type="button"
                    className="order-last group cursor-pointer transition-all active:scale-95 ml-auto md:ml-0"
                    onClick={ () => setIsEditing(true) }
                    title="Edit Transaction"
                />
            }

            { actionButton === 'restore' && (
                <button 
                    type="button"
                    className="ml-2 group cursor-pointer transition-all active:scale-95 order-last"
                    title="Restore Transaction"
                    onClick={handlers.handleRestore}
                >
                    <ArchiveRestoreIcon className="stroke-slate-400 group-hover:stroke-slate-900 transition-colors" />
                </button>
            )}

        </form>
    )
}