import type { Transaction } from "../../../types/Transaction"
import { objectValuesToString } from "../../../utils/conversion"


export async function getTransactions(
    userId : number,
    options? : {
	    by? : string,
	    page? : number,
	    perPage? : number,
	    month? : number
    }
) : Promise<{
    data : Transaction[],
    totalPages : number,
    count : number
}> {
    const params = options ? '&' + new URLSearchParams( objectValuesToString(options) ) : ''
    const url = typeof window === 'undefined'
        ? import.meta.env.SITE || 'http://localhost:4321' + `/transactions/api/get?id=${userId}${params}`
        : `/transactions/api/get?id=${userId}${params}`
    const res = await fetch(url)
    const json = await res.json()
    return json
}
