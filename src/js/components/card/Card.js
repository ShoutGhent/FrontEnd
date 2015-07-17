import React from 'react'

var Card = React.createClass({
    render() {
        let { children } = this.props

        return (
            <div className="card">{children}</div>
        )
    }
})

var CardTitle = React.createClass({
    render() {
        let { children } = this.props

        return (
            <div className="card-title black-text">{children}</div>
        )
    }
})

var CardContent = React.createClass({
    render() {
        let { children } = this.props

        return (
            <div className="card-content black-text">{children}</div>
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
