import type { APIContext } from "astro"

const AUTH_COOKIE = "auth"

const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: import.meta.env.PROD,
    path: "/",
}

/**
 * Read and parse auth cookie
 */
export function readAuthCookie(Astro: APIContext) {
    const cookie = Astro.cookies.get(AUTH_COOKIE)
    if (!cookie?.value) return null

    try {
        return JSON.parse(cookie.value)
    } catch {
        return null
    }
}

/**
 * Set auth cookie
 */
export function setAuthCookie(
    Astro: APIContext,
    auth: unknown,
    maxAgeSeconds = 60 * 60 * 24 * 7 // 7 days
) {
    Astro.cookies.set(
        AUTH_COOKIE,
        JSON.stringify(auth),
        {
            ...COOKIE_OPTIONS,
            maxAge: maxAgeSeconds,
        }
    )
}

/**
 * Clear auth cookie
 */
export function clearAuthCookie(Astro: APIContext) {
    Astro.cookies.delete(AUTH_COOKIE, COOKIE_OPTIONS)
}
