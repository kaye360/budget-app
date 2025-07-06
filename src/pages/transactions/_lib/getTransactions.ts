import { objectValuesToString } from "../../../lib/utils"
import { fetchData } from "../../../lib/fetch"
import type { Transaction } from "../../../types/types"
import { BASE_URL } from "../../../../config"

export interface GetTransactions {
    data : Transaction[],
    totalPages? : number,
    count? : number
}

export async function getTransactions(
    userId : number,
    options? : {
	    by? : string,
	    page? : number,
	    perPage? : number,
	    month? : number,
    }
) : Promise<GetTransactions> {
    const params = options ? '&' + new URLSearchParams( objectValuesToString(options) ) : ''

    const res = await fetchData<GetTransactions>(`/api/transactions?id=${userId}&${params}`)

    if( res.error || !res.response ) return { data : [], totalPages : 0, count : 0 }

    return res.response
}
