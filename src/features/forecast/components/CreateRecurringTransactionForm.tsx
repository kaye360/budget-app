import { actions } from "astro:actions"
import { TrendingUpDownIcon } from "lucide-react"
import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react"
import { useLoadingButtonStatus, LoadingButton } from "../../../components/Button/LoadingButton.tsx"
import type { CreateRecurringTransaction, Forecast, RecurringTransaction } from "../recurringTransaction"
import { convertDate } from "../../../lib/convertDate"
import type { ForecastState } from "./ForecastEditor.tsx"
import EditReccuringTransaction from "./EditRecurringTransaction.tsx"

interface Props {
    forecastState : ForecastState
}

export default function CreateRecurringTransactionForm({ forecastState } : Props) {

    const { setForecast } = forecastState

    const createStatus = useLoadingButtonStatus()

    const initialCreateForecast: CreateRecurringTransaction = {
        userId : 1,
        title : '',
        type : 'expense',
        date : '1',
        amount : 0,
        repeats : 'monthly',
        startDate : convertDate().to('YYYY-MM-DD')
    }

    const [
        createRecurringTransaction, 
        setCreateRecurringTransaction
    ] = useState<CreateRecurringTransaction>(initialCreateForecast)

    
    const handleCreateRecurringTransaction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        createStatus.setAsLoading()
        const response = await actions.forecast.store(createRecurringTransaction)

        if( response.error ) {
            createStatus.setAsInitial()
            throw new Error(response.error.message)
        }

        createStatus.setAsComplete()
        setCreateRecurringTransaction(initialCreateForecast)

        setForecast(
            prev => [...prev, response.data[0] as RecurringTransaction]
                .sort((a,b) => a.title > b.title ?  1 : -1)
        )
    }


    return (

        <div>
            <h2 className="font-semibold mt-6">
                 Add a recurring transaction
            </h2>
            <form
                className="flex gap-2"
                onSubmit={handleCreateRecurringTransaction}
            >

                <EditReccuringTransaction 
                    recurringTransaction={createRecurringTransaction}
                    setRecurringTransaction={setCreateRecurringTransaction}
                />
               
                <LoadingButton
                    type="submit"
                    state={createStatus}
                    badge="add"
                    icon={TrendingUpDownIcon}
                    title="Add Recurring Transaction"
                    className="max-w-fit self-end"
                />
            </form>
        </div>
    )
}
