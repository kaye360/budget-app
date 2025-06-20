import Qry from "./Qry";

export function removeLoader() {
    const loader = Qry.one<HTMLElement>('page-loader')
    if( loader ) {
        loader.classList.add('opacity-0')
        setTimeout( () => loader.remove(), 200 )
    }
}