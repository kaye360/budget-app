declare namespace App {
    interface SessionData {
        auth: {
            userId: number,
            userName : string
        } | undefined
    }
}