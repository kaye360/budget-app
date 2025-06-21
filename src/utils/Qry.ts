
export default class Qry {

    public static one<T extends Element = Element>(
        selector: string, 
        context: Document | DocumentFragment | HTMLElement = document
    ): T {
        return context.querySelector(selector) as T
    }

    public static all<T extends Element = Element>(
        selector: string, 
        context: Document | DocumentFragment | HTMLElement = document
    ): T[] {
        return Array.from( context.querySelectorAll(selector) ) as T[]
    }

    public static setTextContent(
        textContent: string,
        selector: string, 
        context: Document | DocumentFragment | HTMLElement = document
    ) {
        const el = context.querySelector(selector)
        if( el && 'textContent' in el ) {
            el.textContent = textContent
        }
    }

    public static setValue(
        value: string,
        selector: string, 
        context: Document | DocumentFragment | HTMLElement = document
    ) {
        const el = context.querySelector(selector)
        if( el && 'value' in el ) {
            el.value = value
        }
    }

}