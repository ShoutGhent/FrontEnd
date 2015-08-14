import React, { PropTypes } from 'react'

import cx from 'classnames'
import Ink from 'react-ink'

var Button = React.createClass({
    propTypes: {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        flat: PropTypes.bool,
        large: PropTypes.bool,
        full: PropTypes.bool,
        onClick: PropTypes.func,
        right: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            className: '',
            disabled: false,
            flat: false,
            large: false,
            full: false,
            onClick: () => {},
            right: false,
        }
    },

    render() {
        let { children, large, right, flat, full, disabled, onClick, className } = this.props

        let btnStyle = {
            position: 'relative'
        }

        // Attach classes
        let classes = cx({
            'btn': true,
            'btn-large': large,
            'btn-flat': flat,
            'btn-block': full,
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
