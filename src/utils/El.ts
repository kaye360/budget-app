
/**
 * 
 * Short querySelector wrappers
 * 
 */

type Context = Document | Element | DocumentFragment

export function el<T extends Element>(
    selector: string,
    context: Context = document,
    callback?: (el: T) => void
): T | null {

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

    const els = Array.from(context.querySelectorAll<T>(selector))

    if( els && callback ) {
        els.forEach( el => callback(el) )
    }

    return els
}
