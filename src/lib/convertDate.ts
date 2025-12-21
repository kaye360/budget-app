
type ValidDateFormats = 'YYYY-MM' | 'YYYY-MM-DD' | "MMM-DD" | "MMM-YYYY" |"MMM-DD-YYYY" | 'MMMM-YYYY' | 'MMM-YY'

type FormattedDates = {
    [key in ValidDateFormats]: string
}

export const convertDate = (inputDate: string | undefined | null = undefined) => {
    const date = inputDate
        ? new Date(inputDate)
        : new Date()

    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${inputDate}`)
    }

    const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const getFormattedDates = () => {
        const year = date.getFullYear()
        const yearShort = String(year).slice(-2)
        const month = date.getMonth()
        const monthNumber = String(month + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return {
            'MMM-DD': `${shortMonthNames[month]} ${day}`,
            'MMM-DD-YYYY': `${shortMonthNames[month]} ${day}, ${year}`,
            'MMM-YY' : `${shortMonthNames[month]} ${yearShort}`,
            'MMM-YYYY': `${shortMonthNames[month]} ${year}`,
            'MMMM-YYYY': `${fullMonthNames[month]} ${year}`,
            'YYYY-MM': `${year}-${monthNumber}`,
            'YYYY-MM-DD': `${year}-${monthNumber}-${day}`,
        } as FormattedDates
    }

    return {
        to(format: ValidDateFormats) {
            return getFormattedDates()[format]
        },

        nextMonth(num: number = 1) {
            date.setMonth(date.getMonth() + num)
            return this 
        },

        prevMonth(num: number = 1) {
            date.setMonth(date.getMonth() - num)
            return this 
        },
    }
}
