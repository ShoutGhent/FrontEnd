import React, { PropTypes } from 'react'

let Parallax = React.createClass({
    propTypes: {
        img: PropTypes.string.isRequired,
        height: PropTypes.number
    },
    getDefaultProps() {
        return {
            height: 'auto'
        }
    },
    render() {
        let css = {
            backgroundImage: `url(${this.props.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: this.props.height
        }

        let { children } = this.props

        return (<div style={css}>{children}</div>)
    }
})

export default Parallax
