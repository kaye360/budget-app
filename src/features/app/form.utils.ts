

export function getFormData( form : HTMLFormElement) {
        const formData = new FormData(form)
        const entries = Object.fromEntries( formData.entries() )
        return entries
}