import React, { PropTypes } from 'react'

var Card = React.createClass({
    render() {
        let { children, className } = this.props

        className = `card ${className ? className : ''}`

        return (
            <div {...this.props} className={className}>{children}</div>
        )
    }
})

var CardTitle = React.createClass({
    propTypes: {
        center: PropTypes.bool,
        light: PropTypes.bool
    },
    getDefaultProps() {
        return {
            center: false,
            light: false
        }
    },
    render() {
        let { children, center, light } = this.props
        let className = `card-title ${light ? 'white-text' : 'black-text'} ${center ? 'center' : ''}`

        return (
            <div className={className}>{children}</div>
        )
    }
})

var CardContent = React.createClass({
    propTypes: {
        light: PropTypes.bool
    },
    getDefaultProps() {
        return {
            light: false
        }
    },
    render() {
        let { children, light } = this.props

        return (
            <div className={`card-content ${light ? 'white-text' : 'black-text'}`} {...this.props}>{children}</div>
        )
    }
})

var CardFooter = React.createClass({
    render() {
        let { children } = this.props

        return (
            <div className="card-action">{children}</div>
        )
    }
})

export default { Card, CardContent, CardTitle, CardFooter }
