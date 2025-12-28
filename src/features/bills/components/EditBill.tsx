import { useState, type FormEvent, type KeyboardEvent } from "react"
import { LoadingButton, useLoadingButtonStatus } from "../../../components/Button/LoadingButton.tsx"
import { CreateBill, type Bill } from "../bill.schema"
import { actions } from "astro:actions"
import { sleep } from "../../app/app.utils.ts"
import type { Account } from "../../settings/accounts.schema.ts"
import { Trash2Icon } from "lucide-react"
import CancelButton from "../../../components/Button/CancelButton.tsx"
import EditButton from "../../../components/Button/EditButton.tsx"

interface Props {
    bill : Bill,
    accounts : Account[]
}

export default function EditBill({bill : intitialBill, accounts} : Props) {

    const [bill, setBill] = useState<Bill>(intitialBill)
    const [isEditing, setIsEditing] = useState<Boolean>(false)
    const saveStatus = useLoadingButtonStatus()
    const deleteStatus = useLoadingButtonStatus()
    const restoreStatus = useLoadingButtonStatus()

    const handlers = {

        handleSave : async (e : FormEvent) => {
            e.preventDefault()
    
            saveStatus.setAsLoading()
            
            const response = await actions.bill.update({...bill})

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

            const response = await actions.bill.destroy({id: Number(bill.id)})

            if( response.error ) {
                deleteStatus.setAsInitial()
                throw new Error(response.error.message)
            }
            
            deleteStatus.setAsComplete()
        },
    
    
        handleEsc : (e: KeyboardEvent<HTMLFormElement>) => {
            if( e.key === 'Escape' ) handlers.cancelChangesHandler()
        },
    
        cancelChangesHandler : () => {
            if( isEditing ) setBill(intitialBill)
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
            className="flex items-center gap-4 flex-wrap md:flex-nowrap odd:bg-blue/5 hover:bg-blue/10 p-2 rounded-md"
        >
            { isEditing ? (
                <input 
                    type="text" 
                    name="title" 
                    value={bill.title}
                    onChange={ e => setBill({...bill, title : e.target.value})}
                    required 
                    className="w-37.5"
                />
            ): (
                <span className="text-lg font-semibold min-w-max">
                    {bill.title}
                </span>
            )}

            { isEditing ? (
                <input 
                    type="number" 
                    name="amount"  
                    value={bill.amount}
                    onChange={ e => setBill({...bill, amount : Number(e.target.value)})}
                    required 
                    className="w-18.75"
                /> 
            ) : ( 
                <span className="text-lg">
                    {bill.amount}
                </span>
            )}

            <span className="ml-auto md:flex items-center gap-2 italic text-sm">
                <span className="min-w-max">
                    Withdraws from &nbsp;
                </span>
                { isEditing ? (
                    <select 
                        name="account"
                        value={bill.accountId ?? ''}
                        onChange={ e => setBill({
                            ...bill, 
                            accountId : Number(e.target.value),
                            accountName : accounts.find( acc => acc.id === Number(e.target.value) )?.name || '',
                            accountNumber : accounts.find( acc => acc.id === Number(e.target.value) )?.number || 0,
                        })}
                    >
                        { accounts.map( (account) => (
                            <option value={account.id} key={account.id}>
                                {account.name} - {account.number}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span className="relative bg-blue/20 md:p-2 rounded-md">
                        {bill.accountName} ● {bill.accountNumber}
                    </span> 
                )}
                &nbsp;on&nbsp; 
                { isEditing ? (
                    <input 
                        type="date" 
                        name="date" 
                        value={bill.date}
                        onChange={ e => setBill({...bill, date : e.target.value})}
                        required 
                    />
                ) : (
                    <span className="relative bg-blue/20 md:p-2 rounded-md">
                        {bill.date}
                    </span> 
                )}
                &nbsp;repeating&nbsp; 
                { isEditing ? (
                    <select 
                        name="repeats" 
                        onChange={ e => setBill({...bill, repeats : e.target.value as CreateBill['repeats']})}
                        value={bill.repeats}
                        required
                        className="min-w-fit"
                    >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Biweekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                ) : (
                    <span className="relative bg-blue/20 md:p-2 rounded-md">
                        {bill.repeats}
                    </span> 
                )}
            </span>
            
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
                    <CancelButton 
                        className="order-last group cursor-pointer transition-all active:scale-95"
                        onClick={handlers.cancelChangesHandler}
                        title="Cancel Editing"
                    />
                </>
            )}

            { !isEditing &&
                <EditButton
                    type="button"
                    className="order-last group cursor-pointer transition-all active:scale-95 ml-auto md:ml-0"
                    onClick={ () => setIsEditing(true) }
                    title="Edit Transaction"
                />
            }
            

        </form>
    )
}