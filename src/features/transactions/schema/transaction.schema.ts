import { z } from "astro/zod"

export const Transaction = z.object({
    accountId: z.coerce.number(),
    amount: z.coerce.number(),
    budget: z.coerce.string(),
    budgetId: z.coerce.number().nullable(),
    date: z.coerce.string(),
    description: z.coerce.string(),
    isDeleted: z.coerce.boolean(),
    userId: z.coerce.number(),
    id : z.number()
})

export const CreateTransaction = Transaction.omit({ id : true})

export type Transaction = z.infer<typeof Transaction>
export type CreateTransaction = z.infer<typeof CreateTransaction>