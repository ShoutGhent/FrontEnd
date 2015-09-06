import emojione from 'emojione'

class EmojiToNative {

    fix(line) {
        let data = line.match(/\<img class\=\"([^"]*)\" alt\=\"([^"]*)\" src\=\"([^"]*)\"\/\>/i)

        return data[2]
    }

    decode(html) {
        if ( ! html) return html
        
        var e = document.createElement('div')
        e.innerHTML = html
        return e.childNodes[0].nodeValue
    }

    convert(html) {
        html = emojione.toImage(html)

        var matches = html.match(/\<img class\=\"([^"]*)\" alt\=\"([^"]*)\" src\=\"([^"]*)\"\/\>/gi)

        if (matches) {
            matches.map((item, key) => {
                html = html.replace(matches[key], this.fix(item))
            })
        }

        return this.decode(html)
    }

}

const emojiToNative = new EmojiToNative()

export default html => {
    return emojiToNative.convert(html)
}
