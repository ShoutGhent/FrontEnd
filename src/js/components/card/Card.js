import React from 'react'

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
    getDefaultProps() {
        return {
            center: false
        }
    },
    render() {
        let { children, center } = this.props
        let className = `card-title black-text ${center ? 'center' : ''}`

        return (
            <div className={className}>{children}</div>
        )
    }
})

var CardContent = React.createClass({
    render() {
        let { children } = this.props

        return (
            <div className="card-content black-text" {...this.props}>{children}</div>
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
