

export function formDataToCsv( form : HTMLFormElement) {
        const formData = new FormData(form)
        const entries = Object.fromEntries( formData.entries() )
        const transactions = String(entries.transactions)
        const account = String(entries.account)
        return { transactions, account }
}