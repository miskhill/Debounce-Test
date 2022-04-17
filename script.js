const input = document.querySelector("input")
const defaultText = document.getElementById("default")
const debounceText = document.getElementById("debounce")
const throttleText = document.getElementById("throttle")

const updateDebounceText = debounce(() => {
    //debounceText.textContent = text
    incrementCount(debounceText)
})

const updateThrottleText = throttle(() => {
    //throttleText.textContent = text
    incrementCount(throttleText)
})

// input.addEventListener("input", e => {
//     defaultText.textContent = e.target.value
//     updateDebounceText(e.target.value)
//     updateThrottleText(e.target.value)
// })

function debounce (cb, delay = 1000) {
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

document.addEventListener("mousemove", e => {
incrementCount(defaultText)
})

function incrementCount(element) {
    element.textContent = (parseInt(element.innerText) || 0 ) + 1
}