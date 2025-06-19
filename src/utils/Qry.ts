
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

}