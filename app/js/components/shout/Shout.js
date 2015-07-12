import React from 'react'
import Avatar from '../users/Avatar'
import Icon from '../partials/Icon'
import moment from 'moment'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'

moment.locale('nl')

var Shout = React.createClass({
    getInitialState() {
        return {
            width: '100%',
            visible: true,
            intervalId: null
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
                    clearInterval(this.state.intervalId)
                    this.setState({
                        intervalId: null,
                        visible: false
                    })
                } else {
                    this.setState({
                        width: `${percentage}%`
                    })
                }
            }, 800)

            this.setState({
                intervalId: interval
            })
        }
    },
    componentDidMount() {
        this.calcPercentage()
    },
    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    },
    render() {
        var name = this.props.shout.anonymous ? 'Anonymous' : this.props.shout.user.name
        var email = this.props.shout.anonymous ? 'anonymous' : this.props.shout.user.email

        var css = {
            display: this.state.visible ? 'block' : 'none'
        }
        return (
            <div className="card shout" style={css}>
                <div className="card-content black-text">
                    <div className="card-title black-text">
                        <a href="#">
                            <Avatar email={email} size={35}/>
                        </a>
                        {name}
                        <Dropdown className="right">
                            <DropdownTitle>
                                <Icon icon="more_vert"/>
                            </DropdownTitle>
                            <DropdownContent top={0}>
                                <li><a href>Permalink</a></li>
                                <li><a href>Share</a></li>
                                <li><a href>Something Else</a></li>
                            </DropdownContent>
                        </Dropdown>
                    </div>
                    <p>{this.props.shout.description}</p>
                </div>
                <div className="card-action right-align">
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

