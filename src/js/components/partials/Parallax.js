import React from 'react'

let Parallax = React.createClass({
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
