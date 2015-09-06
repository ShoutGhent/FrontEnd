import React, { PropTypes } from 'react'

import Emoji from 'emojione'

var Emojify = React.createClass({
    convert(line) {
        let data = line.match(/\<img class\=\"([^"]*)\" alt\=\"([^"]*)\" src\=\"([^"]*)\"\/\>/i)

        return data[2]
    },
    makeRealImages(html) {
        var matches = html.match(/\<img class\=\"([^"]*)\" alt\=\"([^"]*)\" src\=\"([^"]*)\"\/\>/gi)
        matches.map((item, key) => {
            html = html.replace(matches[key], this.convert(item))
        })
        return html
    },
    render() {
        let { children } = this.props

        children = this.makeRealImages(Emoji.toImage(children))

        return (
            <span>{children}</span>
        )
    }
})

export default Emojify
