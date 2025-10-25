import type { Database } from "./supabase";


/**
 * DB Transaction types
 */

export type Transaction = Database['public']['Views']['TransactionView']['Row']

export type CreateTransaction = Database['public']['Tables']['Transactions']['Insert'];

/**
 * API Transaction types
 */

export interface RecentTransactionsAPIResponse {
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

/**
 * DB Budget Types
 */

export type Budget = Database['public']['Tables']['Budgets']['Row']

/**
 * API Budget Types
 */

export interface GetBudgets {
    data : Budget[]
}


export interface BudgetWithSpending extends Budget {
    totalSpent : number
    percentSpent : number
}


/**
 * Summary Types
 */

export interface MonthlySpendingSummaryAPIResponse {
    budgets: number, 
    spent : number
}