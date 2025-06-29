import { fetchData } from "../../../lib/fetch";
import type { Budget } from "../../../types/Budget";


export async function getBudgets() : Promise<Budget[]> {

    const res = await fetchData<{ data: Budget[]}>('/api/budgets?id=1')

    if( res.error || !res.response ) return []

    return res.response?.data as Budget[]
}