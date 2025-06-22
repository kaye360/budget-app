import Qry from "../../utils/Qry";

export class Loader {

    public static remove() {
        const loader = Qry.one<HTMLElement>('page-loader')
        loader?.classList.add('opacity-0')
        setTimeout( () => loader?.remove(), 250 )
    }
}
