import React, { PropTypes } from 'react'

import cx from 'classnames'
import Ink from 'react-ink'

var Button = React.createClass({
    propTypes: {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        flat: PropTypes.bool,
        full: PropTypes.bool,
        large: PropTypes.bool,
        onClick: PropTypes.func,
        padding: PropTypes.string,
        rectangular: PropTypes.bool,
        right: PropTypes.bool
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
            right: false
        }
    },

    render() {
        let { children, large, right, flat, full, rectangular, disabled, onClick, className, padding } = this.props

        let btnStyle = {
            position: 'relative',
            padding: padding
        }

        // Attach classes
        let classes = cx({
            'btn': true,
            'btn-large': large,
            'btn-flat': flat,
            'btn-block': full,
            'btn-rectangular': rectangular,
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

export default { Button }
