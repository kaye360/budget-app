import { useState, type FormEvent } from "react"
import type { Account } from "../../settings/accounts.schema.ts"
import { CreateBill, type Bill } from "../bill.schema.ts"
import { LoadingButton, useLoadingButtonStatus } from "../../../components/Button/LoadingButton.tsx"
import { actions } from "astro:actions"
import { sleep } from "../../app/app.utils.ts"
import { ArrowRightLeftIcon } from "lucide-react"

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
        accountId: null
    }

    const [bill, setBill] = useState<CreateBill>(intitialBill)
    const [billList, setBillList] = useState<Bill[]>(intitialBills)

    const saveStatus = useLoadingButtonStatus()

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log('sup')
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
            <section>
                { billList.map( (bill) => (
                    <div key={bill.id}>
                        {bill.title} - {bill.amount}
                    </div>
                ))}
            </section>

            <form
                method="post"
                onSubmit={handleSave}
                className="grid md:grid-cols-3 items-end gap-4"
            >

                <label>
                    Title
                    <input type="text" name="title" required />
                </label>

                <label>
                    Description
                    <input type="text" name="description" />
                </label>

                <label>
                    Amount
                    <input type="number" name="amount"  required /> 
                </label>

                <label>
                    Withdrawl Date:
                    <input type="date" name="date" required />
                </label>

                <label>
                    Start Date:
                    <input type="date" name="startDate" required />
                </label>

                <div>
                    Type
                    <div className="border border-blue rounded w-fit text-sm font-medium md:h-full">
                        <button 
                            type="button"
                            className={`
                                py-0.5 px-2 h-full 
                                ${false ? 'bg-blue text-white' : ''}
                            `}
                        >
                            Income
                        </button>
                        <button 
                            type="button"
                            className={`
                                py-0.5 px-2 h-full 
                                ${true ? 'bg-blue text-white' : ''}
                            `}
                        >
                            Spending
                        </button>
                    </div>
                </div>

                <label>
                    Repeats
                    <select name="repeats" required>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Biweekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </label>

                <label>
                    Account
                    <select name="account">
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