import { convertDate } from "../lib/convertDate"
import { db } from "../lib/db"

/**
 * 
 * Get query params for get request
 * 
 */
export type QueryParams = {
    id : number
    filter : string
    filterValue : string | null | undefined
    page : number
    perPage : number
}

export function getQueryParamsFromUrl(requestUrl: string, id : number): QueryParams {
    
    const url = new URL(requestUrl)
    const searchParams = url.searchParams

    const pathArray = url.pathname.split('/')
	const transactionsIndex = pathArray.indexOf('transactions')

	const filter = pathArray[transactionsIndex + 1]
	const filterValue = pathArray[transactionsIndex + 2] || null

    const toNumber = (key: string|null, defaultValue: number) => {
        const value = Number(key)
        return isNaN(value) || value === 0 ? defaultValue : value
    }

    return {
        id,
        filter,
        filterValue,
        page:    toNumber(searchParams.get('page'), 0),
        perPage: toNumber(searchParams.get('perPage'), 50),
    }
}


/**
 * 
 * GET Request Handlers
 * 
 */

type Handlers = {
    [key : string] : Function
}

export const handlers : Handlers = {

    recent : async ({id, page, perPage} : QueryParams ) => {

        const start = page * perPage
        const end = start + perPage - 1

        const { data, count } = await db.from('TransactionView')
            .select('*', { count: 'exact'})
            .order('date', { ascending : false })
            .eq('userId', id)
            .eq('isDeleted', false)
            .range(start, end)

        return { data, count, totalPages : Math.ceil( (count ?? 0) / perPage) }
    },

    month : async ({id, filterValue: date} : QueryParams ) => {

        if( !date ) {
            return { error : 'Invalid Date'}
        }

        const [year, month] = date.split('-').map(Number)
        const startDate = `${year}-${month}-01`
        const endDate = (new Date(year, month, 0)).toISOString().slice(0,10)

        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', id)
            .eq('isDeleted', false)
            .gte('date', startDate)
            .lte('date', endDate)

        const { data : monthData } = await db.from('TransactionView')
            .select('date')
            .eq('userId', id)
            .eq('isDeleted', false)

        const uniqueMonths = [...new Set( 
            monthData?.map( month => month.date && month.date.slice(0,7) )
                .filter(Boolean)
        )]

        const months = uniqueMonths
            .sort()
            .reverse()
            .map( month => ({
                month,
                title : convertDate(month).to('MMM-YYYY')
            }))

        return { data, months }
    },

    budget : async({id, filterValue: budgetId} : QueryParams) => {

        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', id)
            .eq('isDeleted', false)
            .eq('budgetId', Number(budgetId))

        return { data }
    },

    deleted : async({id} : QueryParams) => {

        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', id)
            .eq('isDeleted', true)
        
        return { data }
    },

    uncategorized : async({id} : QueryParams) => {
        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', id)
            .eq('budget', 'Uncategorized')
        
        return { data }
    }

}
