

/**
 * 
 * Takes a number and returns a human readable dollar amount
 * 
 */
export function toCurrency( amount: number | string | undefined ): string {
    if( !amount) {
        return '0.00'
    }


    const num = Number(amount);
    const sign = num < 0 ? '-' : '';
    const abs = Math.abs(num).toFixed(2);

    console.log(sign, amount)

    return `${sign}$${abs}`;
}
