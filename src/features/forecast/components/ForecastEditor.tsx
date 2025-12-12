import { useState, type Dispatch, type SetStateAction } from "react";
import type { Forecast } from "../recurringTransaction";
import CreateRecurringTransactionForm from "./CreateRecurringTransactionForm";
import EditForecastForm from "./EditForecastForm";

interface Props {
    initialForecast : Forecast,
}

export type ForecastState = {
    forecast: Forecast,
    setForecast : Dispatch<SetStateAction<Forecast>>
}

export default function ForecastEditor({ initialForecast } : Props) {

    const [forecast, setForecast] = useState<Forecast>(initialForecast)
    const forecastState = {forecast, setForecast}

    return(
        <>
            <EditForecastForm forecastState={forecastState}/>
            <CreateRecurringTransactionForm forecastState={forecastState} />
        </>
    )
}