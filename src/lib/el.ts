
/**
 * 
 * Short querySelector wrappers
 * 
 */

type Context = Document | Element | DocumentFragment | Node

export function el<T extends Element>(
    selector: string,
    context: Context = document,
    callback?: (el: T) => void
): T | null {

    if( !('querySelector' in context) ) {
        console.warn('Invalid context')
        return null
    }

    const el = context.querySelector<T>(selector)

    if( el && callback ) {
        callback(el)
    }

    return el
}


export function els<T extends Element>(
    selector: string,
    context: Context = document,
    callback?: (el: T) => void
): Array<T> {

    if( !('querySelector' in context) ) {
        console.warn('Invalid context')
        return []
    }

    const els = Array.from(context.querySelectorAll<T>(selector))

    if( els && callback ) {
        els.forEach( el => callback(el) )
    }

    return els
}
