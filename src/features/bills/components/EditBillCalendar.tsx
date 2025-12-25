import { useState, type FormEvent } from "react"
import type { Account } from "../../settings/accounts.schema.ts"
import { CreateBill, type Bill } from "../bill.schema.ts"
import { LoadingButton, useLoadingButtonStatus } from "../../../components/Button/LoadingButton.tsx"
import { actions } from "astro:actions"
import { sleep } from "../../app/app.utils.ts"
import { ArrowRightLeftIcon } from "lucide-react"
import EditBill from "./EditBill.tsx"

interface Props {
    bills : Bill[],
    accounts : Account[]
}
export default function EditBillCalendar({
    bills : intitialBills,
    accounts
} : Props) {

    const intitialBill: CreateBill = {
        userId: 1,
        title: "",
        type: "expense",
        amount: 0,
        repeats: "monthly",
        date: "",
        startDate: "",
        accountId: accounts[0].id ?? null
    }

    const [bill, setBill] = useState<CreateBill>(intitialBill)
    const [billList, setBillList] = useState<Bill[]>(intitialBills)

    const saveStatus = useLoadingButtonStatus()

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        saveStatus.setAsLoading()
        const saveResponse = await actions.bill.store(bill)
        
        if( saveResponse.error ) {
            saveStatus.setAsInitial()
            throw new Error(saveResponse.error.message)
        }

        const billsResponse = await actions.bill.index()

        if( billsResponse.error ) {
            saveStatus.setAsInitial()
            throw new Error(billsResponse.error.message)
        }

        setBillList(billsResponse.data.bills)
        saveStatus.setAsComplete()
        await sleep(1000)

        setBill(intitialBill)
    }   

    return (
        <>
            <section className="grid gap-2 py-6">
                { billList.map( (bill) => (
                    <EditBill 
                        key={bill.id} 
                        bill={bill} 
                        accounts={accounts}
                    />
                ))}
            </section>

            <h2 className="text-lg font-semibold my-2">Add a Bill</h2>

            <form
                method="post"
                onSubmit={handleSave}
                className="grid md:grid-cols-3 items-end gap-4"
            >

                <label>
                    Title
                    <input 
                        type="text" 
                        name="title" 
                        value={bill.title}
                        onChange={ e => setBill({...bill, title : e.target.value})}
                        required 
                    />
                </label>

                <label>
                    Amount
                    <input 
                        type="number" 
                        name="amount"  
                        value={bill.amount}
                        onChange={ e => setBill({...bill, amount : Number(e.target.value)})}
                        required 
                    /> 
                </label>

                <label>
                    Withdrawl Date:
                    <input 
                        type="date" 
                        name="date" 
                        value={bill.date}
                        onChange={ e => setBill({...bill, date : e.target.value})}
                        required 
                    />
                </label>

                <label>
                    Start Date:
                    <input 
                        type="date" 
                        name="startDate" 
                        value={bill.startDate}
                        onChange={ e => setBill({...bill, startDate : e.target.value})}
                        required 
                    />
                </label>

                <div>
                    Type
                    <div className="border border-blue rounded w-fit text-sm font-medium md:h-full">
                        <button 
                            type="button"
                            onClick={ () => setBill({...bill, type : 'income'}) }
                            className={`
                                py-0.5 px-2 h-full 
                                ${bill.type === 'income' ? 'bg-blue text-white' : ''}
                            `}
                        >
                            Income
                        </button>
                        <button 
                            type="button"
                            onClick={ () => setBill({...bill, type : 'expense'}) }
                            className={`
                                py-0.5 px-2 h-full 
                                ${bill.type === 'expense' ? 'bg-blue text-white' : ''}
                            `}
                        >
                            Spending
                        </button>
                    </div>
                </div>

                <label>
                    Repeats
                    <select 
                        name="repeats" 
                        onChange={ e => setBill({...bill, repeats : e.target.value as CreateBill['repeats']})}
                        value={bill.repeats}
                        required
                    >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Biweekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </label>

                <label>
                    Account
                    <select 
                        name="account"
                        value-={bill.accountId ?? ''}
                        onChange={ e => setBill({...bill, accountId : Number(e.target.value)})}
                    >
                        { accounts.map( (account) => (
                            <option value={account.id} key={account.id}>{account.name}</option>
                        )) }
                    </select>
                </label>

                <div>
                    <LoadingButton 
                        state={saveStatus} 
                        badge="add"
                        text="Add Bill"
                        title="Add Bill"
                        type="submit"
                        icon={ArrowRightLeftIcon}
                    />
                </div>

            </form>
        </>
    )
}