import type { Database } from "./supabase";

export type Transaction = Database['public']['Views']['TransactionView']['Row']

export type CreateTransaction = Database['public']['Tables']['Transactions']['Insert'];

export interface RecentTransactions {
    data : Transaction[],
    totalPages? : number,
    count? : number
}

export interface MonthlyTransactions {
    data : Transaction[],
    months : {
        month : string,
        title : string
    }[]
}

export interface BudgetTransactions {
    data : Transaction[]
}

export interface DeletedTransactions {
    data : Transaction[]
}


export type Budget = Database['public']['Tables']['Budgets']['Row']