import React from 'react'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

let Parallax = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        img: React.PropTypes.string.isRequired
    },
    render() {
        let css = {
            backgroundImage: `url(${this.props.img})`,
            backgroundSize: 'cover'
        }

        return (<div style={css}>{this.props.children}</div>)
    }
})

export default Parallax
