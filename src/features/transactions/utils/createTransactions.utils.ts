
/**
 * @function formDataToCreateTransactions
 * Transforms an unknown amount of FormData key-value pairs into an array of transaction objects.
 * The input formData object is expected to have keys in the format "field-index"
 * Example keys: date-0 date-1 date-2 date-3 amount-0 amount-1 .... 
 * Values will be coerced to numbers later on with zod
 * 
 */
export function formDataToCreateTransactions(
    formData : {[key: string] : FormDataEntryValue}
) {

    const transactions : Record<number, { [key:string] : string | number | boolean }> = {}

    for (const key in formData )  {

        const [col, indexStr] = key.split('-')
        const index = Number(indexStr)
        const value = String(formData[key])

        if( !transactions[index] ) {
            transactions[index] = { 
                isDeleted : false, 
                userId : 1, 
                type : 'spending' 
            }
        }

        transactions[index][col] = value
    }
        
    return Object.values( transactions )
}