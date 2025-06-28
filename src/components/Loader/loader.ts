import { el } from "../../utils/El";

export class Loader {

    public static remove() {
        const loader = el<HTMLElement>('page-loader')
        loader?.classList.add('opacity-0')
        setTimeout( () => loader?.remove(), 250 )
    }
}
