import { fetchData } from "../lib/fetch"
import type { Transaction } from "../types/types"
import { objectValuesToString } from "../utils/app.utils"


/**
 * 
 * @function getTransactionsByRecent
 * Fetch Transactions wrapper for users recent transactions
 * 
 */
export interface RecentTransactions {
    data : Transaction[],
    totalPages? : number,
    count? : number
}

export async function getTransactionsByRecent(
    userId : number,
    options? : {
        page? : number,
        perPage? : number,
    }
) : Promise<RecentTransactions> {

    const params = options 
        ? new URLSearchParams( objectValuesToString(options) ) 
        : ''

    const url = `/api/transactions?id=${userId}&by=recent&${params}`
    const res = await fetchData<RecentTransactions>(url)

    if( res.error || !res.response ) {
        return { data : [], totalPages : 0, count : 0 }
    }

    return res.response
}


/**
 * 
 * @function getTransactionsByMonth
 * Fetch Transactions wrapper for users recent transactions
 * 
 */
export interface MonthlyTransactions {
    data : Transaction[],
    months : {
        month : string,
        title : string
    }[]
}

export async function getTransactionsByMonth(
    userId : number,
    options? : {
        month : string
    }
) : Promise<MonthlyTransactions> {

    const params = options 
        ? new URLSearchParams( objectValuesToString(options) ) 
        : ''

    const url = `/api/transactions?id=${userId}&by=month&${params}`
    const res = await fetchData<MonthlyTransactions>(url)

    if( res.error || !res.response ) {
        return { data : [], months : [] }
    }

    return res.response
}
