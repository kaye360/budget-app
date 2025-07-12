import { db } from "../lib/db"

/**
 * 
 * Get query params for get request
 * 
 */
type QueryParams = {
  id: number
  by: 'recent' | 'month'
  page: number
  perPage: number
  month: string
}

export function getQueryParams(url: string): QueryParams {
    
    const searchParams = new URL(url).searchParams

    const toNumber = (key: string|null, defaultValue: number) => {
        const value = Number(key)
        return isNaN(value) ? defaultValue : value
    }

    const validBy = (by : string|null) : QueryParams['by'] => {
        if( 
            typeof by === 'string' && 
            (['recent', 'month'] as readonly string[]).includes(by)
        ) {
            return by as QueryParams['by']
        }
        return 'recent'
    }

    return {
        by:      validBy(searchParams.get('by')),
        id:      toNumber(searchParams.get('id'), 0),
        page:    toNumber(searchParams.get('page'), 0),
        perPage: toNumber(searchParams.get('perPage'), 50),
        month:   searchParams.get('month') ?? '0125',
    }
}


/**
 * 
 * GET Request Handlers
 * 
 */
export const handlers = {

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

    month : async ({id, month: date} : QueryParams ) => {

        const year = Number( "20" + date.slice(0,2) )
        const month = Number( date.slice(-2) )
        const startDate = `${year}-${month}-01`
        const endDate = (new Date(year, month, 0)).toISOString().split('T')[0]

        const { data } = await db.from('TransactionView')
            .select('*')
            .eq('userId', id)
            .eq('isDeleted', false)
            .gte('date', startDate)
            .lte('date', endDate)

        return { data }
    },

    budget : async({} : QueryParams) => {
        return {}
    }

}
