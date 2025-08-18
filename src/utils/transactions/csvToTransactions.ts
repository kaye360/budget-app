import { convertDate } from "../../lib/convertDate";
import type { CreateTransaction } from "../../types/types";

/**
 * @todo implement accounts, auth
 */


/**
 * Default values for every new Transaction
 * @todo abstract this to a new file to be used in create-transactions
 */
const defaultBankAccountHandler = {
        budgetId : null,
        accountId : 1,
        isDeleted : false, 
        userId : 1,
        source : 'import'
} as const


/**
 * @constant bankAccountHandlers
 * Handler functions for different bank accounts
 * Every bank account will have different CSV format and order 
 */
const bankAccountHandlers = {
    rbc : (transaction : Record<string, string>) => ({
        accountNumber: transaction["Account Number"].slice(-4),
        accountType: transaction["Account Type"],
        amount: parseFloat(transaction["CAD$"] || "0"),
        description: `${transaction["Description 1"]} ${transaction["Description 2"]}`.trim(),
        date: convertDate( transaction["Transaction Date"] ).to('YYYY-MM-DD'),
        ...defaultBankAccountHandler
    }),
    cibc : () => {

    }
}


/**
 * Valid bank account type guard
 */
function isValidBankAccount( account : string ) : account is keyof typeof bankAccountHandlers {
    return account in bankAccountHandlers
}


/**
 * @function csvToTransactions
 * Converts csv data into an array of Transaction Objects
 * based on the bank account provided
 */
export function csvToTransactions(
    csv: string, 
    account : string
) {

    if( !isValidBankAccount(account) ) return []

    const rows = csv
        .trim()
        .split("\n")
        .map(row => row.split(",").map(cell => cell.replace(/^"|"$/g, "").trim()))

    const headers = rows.shift()
    if (!headers) return []

    return rows.map(row => {
        const transaction: Record<string, string> = {}

        headers.forEach((header, i) => {
            transaction[header] = row[i] ?? ""
        });

        return bankAccountHandlers[account](transaction)
    }) as CreateTransaction[]
}