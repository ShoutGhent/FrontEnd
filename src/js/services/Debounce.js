export default (func, wait = 500, immediate = false) => {
    var timeout

    return () => {
        var args = arguments
        var later = () => {
            timeout = null
            if ( ! immediate) func.apply(this, args)
        }
        if (immediate && !timeout) func.apply(this, args)
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}
