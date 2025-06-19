

/**
 * 
 * Convert a timestamp from the db to human readable date
 * 
 */
export function toDateWithYear(datestring : string) : string {

    return new Date(datestring).toLocaleDateString( 'en-us', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })
}