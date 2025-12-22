import { z } from "astro/zod"
import { CreateTransaction, UpdateTransaction } from "../schema/transaction.schema"

/**
 * Validation schemas for Transaction-related Astro Actions
 */
export const TransactionValidator =  {

    index : z.object({
        filter : z.string(),
        filterValue : z.any().optional(),
        page : z.number().optional(),
        perPage : z.number().optional()
    }),

    store : CreateTransaction,

    update : UpdateTransaction,

    destroy : z.object({
        id : z.number()
    })
}