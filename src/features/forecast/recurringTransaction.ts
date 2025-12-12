import { z } from "astro/zod";

export const RecurringTransaction = z.object({
    id : z.coerce.number(),
    userId : z.coerce.number(),
    title : z.coerce.string(),
    type : z.enum(['expense', 'income']),
    amount : z.coerce.number(),
    repeats : z.enum(['weekly', 'biweekly', 'monthly']),
    date : z.coerce.string(),
    startDate : z.coerce.string()
})

export const CreateRecurringTransaction = RecurringTransaction.omit({
    id : true
})

export type RecurringTransaction = z.infer<typeof RecurringTransaction>
export type CreateRecurringTransaction = z.infer<typeof CreateRecurringTransaction>
export type Forecast = RecurringTransaction[]