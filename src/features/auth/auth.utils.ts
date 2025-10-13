import type { APIContext } from "astro";


export async function getAuth(Astro: APIContext) {

    const auth = await Astro.session?.get("auth")

    if (!auth) {
        throw new Error("Unauthorized: no active auth session")
    }

    return auth as NonNullable<App.SessionData["auth"]>
}


export async function isAuth(Astro: APIContext) {
    const auth = await Astro.session?.get("auth");
    return !!auth
}
