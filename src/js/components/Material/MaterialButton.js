import React, { PropTypes } from 'react'

import cx from 'classnames'
import Ink from 'react-ink'

var MaterialButton = React.createClass({
    propTypes: {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        flat: PropTypes.bool,
        full: PropTypes.bool,
        large: PropTypes.bool,
        onClick: PropTypes.func,
        padding: PropTypes.string,
        rectangular: PropTypes.bool,
        circle: PropTypes.bool,
        right: PropTypes.bool,
        zIndex: PropTypes.string
    },
    getDefaultProps() {
        return {
            className: '',
            disabled: false,
            flat: false,
            full: false,
            large: false,
            onClick: () => {},
            padding: '0 2rem',
            rectangular: false,
            circle: false,
            right: false,
            zIndex: 0
        }
    },

    render() {
        let { children, large, right, flat, full, rectangular, circle, disabled, onClick, className, padding, zIndex } = this.props

        let btnStyle = {
            position: 'relative',
            padding: padding,
            zIndex: zIndex
        }

        // Attach classes
        let classes = cx({
            'btn': true,
            'btn-large': large,
            'btn-flat': flat,
            'btn-block': full,
            'btn-rectangular': rectangular,
            'btn-floating btn-large': circle,
            'right': right
        })

        if (!! className) {
            classes = `${classes} ${className}`
        }

        return (
            <button
                className={classes}
                style={btnStyle}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
                <Ink/>
            </button>
        )
    }
})

export default MaterialButton
