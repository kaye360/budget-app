import { z } from "astro/zod"
import { CreateTransaction, Transaction } from "../schema/transaction.schema"


/**
 * Validation schemas for Transaction-related Astro Actions
 */
export const TransactionValidator =  {

    index : z.object({
        filter : z.string(),
        filterValue : z.string().optional(),
        page : z.number().optional(),
        perPage : z.number().optional()
    }),

    store : z.union([
        CreateTransaction,
        z.array(CreateTransaction)
    ]).transform( t => Array.isArray(t) ? t : [t]),

    update : Transaction.partial().extend({ id : z.number() }),

    destroy : z.object({
        id : z.number()
    })
}