import { toOnlyDigits } from "../app.utils"

/**
 * 
 * Transform formData to list of CreateTransactions[] to be inserted into DB
 * 
 */
export function formDataToCreateTransactions(
    formData : FormData
) {

    const validInputs = [
        { title : 'date', type : 'string'},
        { title : 'description', type : 'string'},
        { title : 'amount', type : 'number'},
        { title : 'budgetId', type : 'number'},
        { title : 'accountId', type : 'number'}
    ] as const
    
    const initialValue = { isDeleted : false, userId : 1, source : "manual" }
    const transactions : Record<number, { [key:string] : string | number | boolean }> = {}

    const formEntries = Object.fromEntries( formData.entries() )

    for (const key in formEntries )  {

        const [col, indexStr] = key.split('-')
        const index = Number(indexStr)
        const value = String(formEntries[key])

        const validInput = validInputs.find( input => input.title === col)

        if( !validInput ) {
            throw new Error(`Invalid col: ${col}`)
        }

        if( !transactions[index] ) {
            transactions[index] = initialValue
        }

        transactions[index][col] = validInput.type === 'number'
            ? toOnlyDigits(value)
            : value
    }
        
    return Object.values( transactions )
}