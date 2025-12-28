declare namespace App {
    interface CookieData {
        auth: {
            userId: number,
            userName : string
        } | undefined
    }
}