import type { CreateTransaction } from "../types/types"

/**
 * Take a flat group of Transactions and group them by index
 * Returns array of Transactions
 */
export function createTransactionRequest(data: Record<string, string>) {

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
        transactions[index].source = "manual"
    }

    return Object.values(transactions) as CreateTransaction[]
}