import type { Database } from "./supabase";

export type Transaction = Database['public']['Views']['TransactionView']['Row']
export type CreateTransaction = Database['public']['Tables']['Transactions']['Insert'];


export type Budget = Database['public']['Tables']['Budgets']['Row']