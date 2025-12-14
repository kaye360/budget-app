import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { convertDate } from "../../lib/convertDate";
import { db } from "../../lib/db";

/**
 * @todo Auth
 */
const userId = 1

export const summary = {

    getMonthlySpending : defineAction({
        input : z.object({
            date : z.string().nullable()
        }),
        handler : async ({date}) => {
            
            if(!date) {
                date = convertDate().to('YYYY-MM')
            }

            /**
             * Transaction data for current month
             */
            const [year, month] = date.split('-').map(Number)
            const startDate = `${year}-${month}-01`
            const endDate = (new Date(year, month, 0)).toISOString().slice(0,10)
        
            const { data: transactions } = await db.from('TransactionView')
                .select('amount')
                .order('date', { ascending : false })
                .eq('userId', userId)
                .eq('isDeleted', false)
                .eq('type', 'spending')
                .gte('date', startDate)
                .lte('date', endDate)

        
            /**
             * Total spent in current month
             */
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
                .eq('userId', userId)
                .not('name', 'ilike', '%Income%')

            console.log(amounts)

            const totalBudgets = Math.round( amounts?.reduce(
                (acc, current) => acc + current.amount,
                0
            ) || 0)

            /**
             * Final return value
             */
            return {
                budgets : totalBudgets,
                spent : totalSpent
            }

        }
    })
}