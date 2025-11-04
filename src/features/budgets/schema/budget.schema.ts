import { z } from "astro/zod"

export const CreateBudget = z.object({
    name : z.coerce.string(),
    amount : z.coerce.number()
})

export type CreateBudget = z.infer<typeof CreateBudget>

export interface Budget {
    amount: number
    id: number
    name: string
    userId: number
    totalSpent? : number
    percentSpent? : number
}