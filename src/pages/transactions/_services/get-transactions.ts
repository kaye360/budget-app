import type { Transaction } from "../../../types/Transaction"
import { objectValuesToString } from "../../../utils/utils"


export async function getTransactions(
    userId : number,
    options? : {
	    by? : string,
	    page? : number,
	    perPage? : number,
	    month? : number,
    }
) : Promise<{
    data : Transaction[],
    totalPages : number,
    count : number
}> {
    const params = options ? '&' + new URLSearchParams( objectValuesToString(options) ) : ''
    const base = import.meta.env.DEV ? 'http://localhost:4321' : import.meta.env.SITE
    const url = typeof window === 'undefined'
        ? `${base}/transactions/api/get?id=${userId}${params}`
        : `/transactions/api/get?id=${userId}${params}`
    const res = await fetch(url)
    const json = await res.json()
    return json
}
