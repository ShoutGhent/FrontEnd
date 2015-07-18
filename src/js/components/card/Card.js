import React from 'react'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var Card = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <div className="card">{children}</div>
        )
    }
})

var CardTitle = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <div className="card-title black-text">{children}</div>
        )
    }
})

var CardContent = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <div className="card-content black-text">{children}</div>
        )
    }
})

var CardFooter = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <div className="card-action">{children}</div>
        )
    }
})

export default { Card, CardContent, CardTitle, CardFooter }
