import type { GetTransactions } from "./getTransactions";



export function groupTransactionsByBudget(transactions : GetTransactions) {
    return Object.entries(

        transactions.data.reduce((acc, { budgetId, amount }) => {

            if( !budgetId ) return []

            acc[budgetId] = (acc[budgetId] || 0) + Number(amount);

            return acc;

        }, {} as Record<number, number>)

    ).map(([budgetId, total]) => ({

        budgetId: Number(budgetId),
        total: Math.abs( Math.round(total * 100) / 100 )

    }));
}