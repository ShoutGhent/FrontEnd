import React from 'react'

let Parallax = React.createClass({
    propTypes: {
        img: React.PropTypes.string.isRequired
    },
    render() {
        let css = {
            backgroundImage: `url(${this.props.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }

        let { children } = this.props

        return (<div style={css}>{children}</div>)
    }
})

export default Parallax
