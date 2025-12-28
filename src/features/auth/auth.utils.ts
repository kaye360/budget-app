import type { APIContext } from "astro";
import { readAuthCookie } from "./cookies.utils";

/**
 * Get auth from cookie, throw if not found
 */
export async function getAuth(Astro: APIContext) {
    const auth = readAuthCookie(Astro);

    if (!auth) {
        throw new Error("Unauthorized: no active auth cookie");
    }

    return auth as NonNullable<App.CookieData["auth"]>;
}

/**
 * Get auth from cookie, return null if not found
 */
export async function getAuthIfExists(Astro: APIContext) {
    return readAuthCookie(Astro);
}

/**
 * Check if auth cookie exists
 */
export async function isAuth(Astro: APIContext) {
    try {
        return Boolean(readAuthCookie(Astro));
    } catch (e) {
        console.error(e);
        return false;
    }
}
