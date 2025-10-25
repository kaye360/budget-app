import { convertDate } from "../../../lib/convertDate"
import type { CreateTransaction } from "../../../types/_types"

/**
 * Retrieves the CSV column pattern for a given account ID.
 * Each account may have a different CSV format, so this function maps
 * an account ID to its corresponding column order pattern.
 *
 * @param {string | number} accountId - The ID of the account to get the CSV pattern for.
 */
export function getAccountCsvPattern(accountId : string | number) {

    accountId = String(accountId)

    // Get accountId CSV patterns data - eventually from DB
    const accountCsvPatterns: Record<string, string> = {
        // Everyday
        "1" : 'null,null,date,null,description-1,description-2,amount,null,null',
        // CIBC
        "4" : 'date,description,amount,null,null'
    }

    if( !(accountId in accountCsvPatterns) ) {
        throw new Error('Invalid account ID')
    }

    const accountCsvPattern = accountCsvPatterns[accountId].split(',')
    return accountCsvPattern
}

/**
 * Converts a raw CSV string into a 2D array of cell values.
 *
 * Cleans up whitespace and quotation marks inserted by some accounts
 * Splits the CSV into rows by newline (`\n`).
 * Removes commas inside double quotes to avoid splitting inside quoted fields.
 * 
 * @param string transactions - The raw CSV string to parse.
 * @returns string[][] A 2D array where each subarray represents a CSV row and each element is a cell value.
 *
 */
export function transformCsvToArray(transactions : string) {
    const csvRows = transactions
        .trim()
        .split("\n")
        .map(row => row.replace(/"([^"]*)"/g, (_, inner) => {
            return inner.replace(/,/g, '')
        }).split(',').map(cell => cell.replace(/^"|"$/g, "").trim()))

    return csvRows
}

/**
 * Internal helper function that returns the index positions of each transaction fields within a CSV pattern array.
 *
 * @param {string[]} accountCsvPattern - Array of header field names representing CSV column order.
 * 
 */
function getCsvRowIndexes(accountCsvPattern : string[]) {
    return {
        date : accountCsvPattern.findIndex(p => p === 'date'),
        description : accountCsvPattern.findIndex(p => p === 'description'),
        description1 : accountCsvPattern.findIndex(p => p === 'description-1'),
        description2 : accountCsvPattern.findIndex(p => p === 'description-2'),
        amount : accountCsvPattern.findIndex(p => p === 'amount')
    } as const
}

/**
 * Transforms parsed CSV rows (string[]) into an array of `CreateTransaction` objects.
 *
 * Uses a provided column pattern (`csvPattern`) to locate the correct fields
 * in each row, and converts them into structured transaction objects
 *
 * @param string[][] csvRows - The parsed CSV data as a 2D array, where each inner array represents a row of cell values.
 * @param string[] csvPattern - Array of header field names (e.g., ["date", null, "description", "amount"]) used to determine column indexes.
 * @param string accountId - The ID of the account associated with these transactions.
 * @returns CreateTransaction[] Array of transaction objects derived from the CSV data.
 *
 */
export function transformCsvRowsToTransactions(
    csvRows: string[][],
    csvPattern : string[],
    accountId : string
) {

    const indexes = getCsvRowIndexes(csvPattern)

    const transactions = csvRows.map( row => {

        const transaction: CreateTransaction = {
            date : convertDate(row[indexes.date]).to('YYYY-MM-DD'),
            description : [
                row[indexes.description],
                row[indexes.description1],
                row[indexes.description2],
            ].filter( d => !!d).join(' '),
            amount : Number(row[indexes.amount]),
            accountId : Number(accountId),
            budgetId : null,
            isDeleted : false, 
            userId : 1,
        }

        return transaction
    })

    return transactions
}