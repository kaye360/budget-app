import type { APIRoute } from "astro"
import { db } from "../../../../lib/db"
import { convertDate } from "../../../../lib/convertDate"

export const GET: APIRoute = async ({ request }) => {

    /**
     * @todo implement auth
     */
    const id = 1

    /**
     * Get Date
     */

    const url = new URL(request.url)
    const urlPathArray = url.pathname.split('/')
	const dateIndex = urlPathArray.indexOf('monthly-spending') + 1

	const date = urlPathArray[dateIndex] || convertDate().to('YYYY-MM')

    /**
     * Transaction Data
     */
    const [year, month] = date.split('-').map(Number)
    const startDate = `${year}-${month}-01`
    const endDate = (new Date(year, month, 0)).toISOString().slice(0,10)

    const { data: transactions } = await db.from('TransactionView')
        .select('amount')
        .order('date', { ascending : false })
        .eq('userId', id)
        .eq('isDeleted', false)
        .gte('date', startDate)
        .lte('date', endDate)

    const totalSpent = Math.round( Math.abs( transactions?.reduce(
        (acc, current) =>  acc + (current.amount || 0),
        0
    ) || 0))


    /**
     * Budget Data
     */
    const { data : amounts } = await db.from('Budgets')
        .select('amount')
        .order('name')
        .eq('userId', id)

    const totalBudgets = Math.round( amounts?.reduce(
        (acc, current) => acc + current.amount,
        0
    ) || 0)

    /**
     * Final return value
     */

    const totals = {
        budgets : totalBudgets,
        spent : totalSpent
    }

    return new Response(
        JSON.stringify(totals),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
}