import React from 'react'
import Avatar from '../users/Avatar'
import Icon from '../partials/Icon'
import moment from 'moment'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import { Link } from 'react-router'

moment.locale('nl')

let Shout = React.createClass({
    getInitialState() {
        return {
            width: '100%',
            intervalId: null
        }
    },
    calcPercentage() {
        let { shout, onRemove } = this.props
        let { created_at, publish_until} = shout

        let begin = moment(created_at).format('X')
        let end = publish_until

        if (end != null) {
            end = moment(end).format('X')
            let interval = setInterval(() => {
                let now = moment().format('X')
                let percentage = 100 - (((now - begin) / (end - begin)) * 100)

                if (percentage < 0) {
                    clearInterval(this.state.intervalId)
                    this.setState({
                        intervalId: null
                    })
                    onRemove(shout)
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
        let { shout } = this.props
        let { user, anonymous } = shout

        let anonymousName = 'Anonymous'

        let name = anonymous ? anonymousName : user.name
        let email = anonymous ? anonymousName : user.email

        return (
            <div className="card shout">
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
                                <li>
                                    <Link to="shout" params={{shoutId: shout.uuid}}>
                                        Permalink
                                    </Link>
                                </li>
                            </DropdownContent>
                        </Dropdown>
                    </div>
                    <p>{shout.description}</p>
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

