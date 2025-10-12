
type ValidDateFormats = 'YYYY-MM' | 'YYYY-MM-DD' | "MMM-DD" | "MMM-YYYY" |"MMM-DD-YYYY" | 'MMMM-YYYY'

type FormattedDates = {
    [key in ValidDateFormats]: string
}

const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const convertDate = (inputDate: string | undefined | null = undefined) => {

    const date = inputDate
        ? new Date( inputDate.replaceAll('-', '/') )
        : new Date()

    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${inputDate}`)
    }

    const year = date.getFullYear()
    const month = date.getMonth()
    const monthNumber = String(month + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const formattedDates : FormattedDates = {
        'MMM-DD' : `${shortMonthNames[month]} ${day}`,
        'MMM-YYYY' : `${shortMonthNames[month]} ${year}`,
        'MMM-DD-YYYY' : `${shortMonthNames[month]} ${day}, ${year}`,
        'MMMM-YYYY' : `${fullMonthNames[month]} ${year}`,
        'YYYY-MM' : `${year}-${monthNumber}`,
        'YYYY-MM-DD' : `${year}-${monthNumber}-${day}`,
    }

    return {
        to( format : ValidDateFormats ) {
            return formattedDates[format]
        },
       
        nextMonth() {
            date.setMonth( date.getMonth() + 1 )
            return { to: this.to }
        },  
   
        prevMonth() {
            date.setMonth( date.getMonth() - 1 )
            return { to: this.to }
        }
    }
}
