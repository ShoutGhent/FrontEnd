import React from 'react'
import Avatar from '../users/Avatar'
import Icon from '../partials/Icon'
import moment from 'moment'

moment.locale('nl')

var Shout = React.createClass({
    getInitialState() {
        return {
            width: '100%',
            visible: true
        }
    },
    calcPercentage() {
        var begin = moment(this.props.shout.created_at).format('X')
        var end = this.props.shout.publish_until

        if (end != null) {
            end = moment(end).format('X')
            var interval = setInterval(() => {
                var now = moment().format('X')
                var percentage = 100 - (((now - begin) / (end - begin)) * 100)

                if (percentage < 0) {
                    clearInterval(interval)
                    this.setState({
                        visible: false
                    })
                } else {
                    this.setState({
                        width: `${percentage}%`
                    })
                }
            }, 800)
        }
    },
    componentWillMount() {
        this.calcPercentage()
    },
    render() {
        var name = this.props.shout.anonymous ? 'Anonymous' : this.props.shout.user.name
        var email = this.props.shout.anonymous ? 'anonymous' : this.props.shout.user.email

        var css = {
            display: this.state.visible ? 'block' : 'none'
        }
        return (
            <div className="shout hoverable" style={css}>
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

