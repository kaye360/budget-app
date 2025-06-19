import type { Database } from "./supabase";

export type Transaction = Database['public']['Tables']['Transactions']['Row'];
export type NewTransaction = Database['public']['Tables']['Transactions']['Insert'];

type TransactionAccountType = Transaction['accountType']

export type TransactionAccountTypeLabel = {
    [K in TransactionAccountType ]: string;
}
