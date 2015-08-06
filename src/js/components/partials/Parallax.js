import React, { PropTypes } from 'react'

let Parallax = React.createClass({
    propTypes: {
        img: PropTypes.string.isRequired,
        height: PropTypes.number,
        relative: PropTypes.bool
    },
    getDefaultProps() {
        return {
            height: 'auto',
            relative: false
        }
    },
    render() {
        let css = {
            backgroundImage: `url(${this.props.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: this.props.height
        }

        if (this.props.relative) {
            css.position = 'relative'
        }

        let { children } = this.props

        return (<div style={css}>{children}</div>)
    }
})

export default Parallax
