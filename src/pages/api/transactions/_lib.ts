import { db } from "../../../lib/supabase"
import type { Transaction } from "../../../types/Transaction"

/**
 * Get recent posts by user ID
 */
export async function getRecentByUserId(
    userId : number,
    options : { page : number , perPage : number }
) {
    const start = options.page * options.perPage
    const end = start + options.perPage - 1

    const { data, count } = await db.from('TransactionView')
        .select('*', { count: 'exact'})
        .order('date', { ascending : false })
        .eq('userId', userId)
		.eq('isDeleted', false)
        .range(start, end)

    return { data, count }
}


/**
 * Get query params for get request
 */
type QueryParams = {
  id: number
  by: string
  page: number
  perPage: number
  month: string
}

export function getParams(url: string): QueryParams {
    const searchParams = new URL(url).searchParams

    const getNumber = (key: string, defaultValue: number) => {
        const value = Number(searchParams.get(key))
        return isNaN(value) ? defaultValue : value
    }

    return {
        id: getNumber('id', 0),
        by: searchParams.get('by') ?? 'recent',
        page: getNumber('page', 0),
        perPage: getNumber('perPage', 50),
        month: searchParams.get('month') ?? '0125',
    }
}



/**
 * Take a flat group of Transactions and group them by index
 * Returns array of Transactions
 */
export function groupTransactionsByIndex(data: Record<string, string>) {

    const transactions : Record<number, { [key:string] : string | number | boolean }> = {}

    for (const key in data) {

        const [col, indexStr] = key.split('-')
        const index = Number(indexStr)
        const value = data[key]

        if( !transactions[index] ) {
            transactions[index] = {}
        }

        /**
         * @todo implement auth, accounts
         */
        transactions[index][col] = col === 'amount' ? Number(value) : value
        transactions[index].isDeleted = false
        transactions[index].userId = 1
        transactions[index].accountType = 'Checking'
        transactions[index].accountNumber = "1234"
        transactions[index].source = "manual"
    }

    return Object.values(transactions) as Transaction[]
}



export function errorResponse({ error } : { error : string}) {
	return new Response(
		JSON.stringify(error), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		}
	)
}