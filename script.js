const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const throttleText = document.getElementById("throttle")

//update the text in debounce or mouse move
const updateDebounceText = debounce(() => {
    //debounceText.textContent = text
    incrementCount(debounceText)
})

const updateThrottleText = throttle(() => {
    //throttleText.textContent = text
    incrementCount(throttleText)
}, 100)

//unneeded inputs when not testing text - removed

// input.addEventListener("input", e => {
//     defaultText.textContent = e.target.value
//     updateDebounceText(e.target.value)
//     updateThrottleText(e.target.value)
// })

function debounce (cb, delay = 1500) {
    let timeout
    clearTimeout(timeout)
   
    return (...args) => {
        timeout = setTimeout(() => {
            cb(...args)
        }, delay);
    }
}

function throttle (cb, delay = 1000) {
    let shouldWait = false
    let waitingArgs 
    
    const timeoutFunc = () => {
        if(waitingArgs == null) {
            shouldWait = false
        } else {
            cb(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
   
    }
    return (...args) => {
        if(shouldWait) {
            waitingArgs = args
            return
        } 
        cb(...args)
        shouldWait = true

        setTimeout(timeoutFunc, delay)  
            
     }
    
}

//add event listeners for mousemoves to test throttle/debounce on mousemove rather than just text
document.addEventListener("mousemove", e => {
incrementCount(defaultText)
updateDebounceText()
updateThrottleText()
})

//function to increment the count in text content when the mouse moves
function incrementCount(element) {
    element.textContent = (parseInt(element.innerText) || 0 ) + 1
}