import { el, type Context } from "../../lib/el"

export type LoadingButtonValidState = 'initial' | 'loading' | 'error' | 'success'

export class LoadingButton {

    public readonly button : HTMLButtonElement

    constructor(
        selector : string,
        options : {
            initialState? : LoadingButtonValidState
            context? : Context
        } = {
            initialState : 'initial',
            context : document
        }
    ) {

        const selectedEl = el<HTMLButtonElement>(selector, options.context)

        if( !selectedEl ) {
            throw new Error('Invalid Loading button selector')
        }

        this.button = selectedEl
        this.button.setAttribute('state', options.initialState || 'initial')
    }

    setState( state : LoadingButtonValidState ) {
        this.button.setAttribute('state', state)
    }
}