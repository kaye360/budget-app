
/**
 * 
 * 
 * 
 * 
 */
export function startButtonLoadingAnimation(
    button : HTMLButtonElement | null,
    buttonText : HTMLSpanElement | null,
) {

    if( !button || !buttonText ) {
        console.warn('Invalid button or button text', { button, buttonText })
        return
    }
        
    buttonText.classList.add('animate-clip-swipe-away')
    
    setTimeout( () => {
        buttonText.classList.remove('animate-clip-swipe-away')
        buttonText.classList.add('animate-clip-swipe-in')
        buttonText.innerHTML = createWavyText('Saving...')
        button.disabled = true
        
    }, 300)

    setTimeout( () => {
        buttonText.classList.remove('animate-clip-swipe-in', 'animate-clip-swipe-away')
    }, 600)
}

/**
 * 
 * 
 * 
 * 
 */
export function endButtonLoadingAnimation(
    button : HTMLButtonElement | null,
    buttonText : HTMLSpanElement | null,
    message : string
) {

    if( !button || !buttonText ) {
        console.warn('Invalid button or button text', { button, buttonText })
        return
    }

    setTimeout( () => {
        
        buttonText.classList.add('animate-clip-swipe-away')
        
        setTimeout( () => {
            buttonText.classList.remove('animate-clip-swipe-away')
            buttonText.classList.add('animate-clip-swipe-in')
            buttonText.innerHTML = message
            button.disabled = false
        }, 300)
    }, 1200)
}

/**
 * 
 * 
 * 
 * 
 * 
 */
function createWavyText( text: string ) {
    return text.split('').
        map( (letter, i) => `
            <span 
                class="inline-block -mr-1 animate-wave"
                style="animation-delay : ${i * 0.1}s"
            >
                ${letter}
            </span>
        `)
        .join('')
        .replaceAll(',', '')
}