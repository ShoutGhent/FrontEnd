import React from 'react'
import Avatar from '../users/Avatar'
import Icon from '../partials/Icon'
import moment from 'moment'

moment.locale('nl')

var Shout = React.createClass({
    getInitialState() {
        return {
            width: '100%'
        }
    },
    calcPercentage() {
        var begin = moment(this.props.shout.created_at).format('X')
        var end = this.props.shout.publish_until

        if (end != null) {
            end = moment(end).format('X')
            setInterval(() => {
                var now = moment().format('X')
                var percentage = 100 - (((now - begin) / (end - begin)) * 100)

                this.setState({
                    width: `${percentage}%`
                })
            }, 800)
        }
    },
    componentWillMount() {
        this.calcPercentage()
    },
    render() {
        var name = this.props.shout.anonymous ? 'Anonymous' : this.props.shout.user.name
        var email = this.props.shout.anonymous ? 'anonymous' : this.props.shout.user.email

        return (
            <div className="shout hoverable">
                <div className="shout-header">
                    <a href="#">
                        <Avatar email={email} size={35}/>
                    </a>
                    <span className="shout-title">{name}</span>
                </div>

                <div className="shout-content black-text">{this.props.shout.description}</div>
                <div className="shout-footer right-align">
                    <a href="#"><Icon icon="grade"/></a>
                </div>
                <div className="shout-progress">
                    <div className="progress">
                        <div className="determinate" style={{width: this.state.width}}></div>
                    </div>
                </div>
            </div>
        )
    }
})

export default Shout

