import { el } from "../../lib/el"

export type LoadingButtonValidState = 'initial' | 'loading' | 'error' | 'success'

export class LoadingButton {

    public readonly button : HTMLButtonElement

    constructor(
        selector : string,
        options : {
            initialState : LoadingButtonValidState
        } = {
            initialState : 'initial'
        }
    ) {

        const selectedEl = el<HTMLButtonElement>(selector)

        if( !selectedEl ) {
            throw new Error('Invalid Loading button selector')
        }

        this.button = selectedEl
        this.button.setAttribute('state', options.initialState)
    }

    setState( state : LoadingButtonValidState ) {
        this.button.setAttribute('state', state)
    }
}