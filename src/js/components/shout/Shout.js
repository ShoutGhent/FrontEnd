import React from 'react'
import Avatar from '../users/Avatar'
import Icon from '../partials/Icon'
import moment from 'moment'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import { Link } from 'react-router'
import WebStorage from '../../services/WebStorage'
import EditShout from '../pages/shout/EditShout'
import TransitiveNumber from 'react-transitive-number'
import ShoutActions from './ShoutActions'

moment.locale('nl')

let Shout = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    getInitialState() {
        let { shout } = this.props

        return {
            width: '100%',
            intervalId: null,
            currentUser: WebStorage.fromStore('user'),
            modalOpen: false,
            shout: shout,
            secondsLeft: 0
        }
    },
    calcPercentage(shout, onRemove) {
        let { created_at, publish_until} = shout

        let begin = moment(created_at).format('X')
        let end = publish_until

        if (end != null) {
            end = moment(end).format('X')
            let interval = setInterval(() => {
                let now = moment().format('X')
                let percentage = 100 - (((now - begin) / (end - begin)) * 100)

                if (percentage >= 0) {
                    this.setState({
                        width: `${percentage}%`,
                        secondsLeft: end - now
                    })
                } else {
                    clearInterval(this.state.intervalId)
                    this.setState({
                        intervalId: null
                    })
                    onRemove(shout)
                }
            }, 500)

            this.setState({
                intervalId: interval
            })
        }
    },
    componentDidMount() {
        let { shout, onRemove } = this.props
        this.calcPercentage(shout, onRemove)
    },
    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    },
    openModal(event) {
        event.preventDefault()
        this.setState({
            modalOpen: true
        })
    },
    save(shout) {
        this.setState({ shout })

        ShoutActions.editShout(shout)

        this.calcPercentage(shout, this.props.onRemove)
    },
    closeModal() {
        this.setState({
            modalOpen: false
        })
    },
    render() {
        let { currentUser, width, modalOpen, shout } = this.state
        let { anonymous } = shout

        let user = this.props.user

        let anonymousName = 'Anonymous'

        let name = anonymous ? anonymousName : user.name
        let email = anonymous ? anonymousName : user.email

        let myShout = currentUser.uuid == user.uuid

        let links = [
            <li key="edit"><a href onClick={this.openModal}>Edit</a></li>,
            //null ? <li><a href onClick={(event) => {event.preventDefault}}>Republish</a></li> : ''
        ]

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
                                <li><Link to="shout" params={{shoutId: shout.uuid}}>Permalink</Link></li>
                                <li><a>Rapporteren</a></li>
                                {myShout ? links.map(item => item) : ''}
                            </DropdownContent>
                        </Dropdown>
                        <EditShout isOpen={modalOpen} onSave={this.save} onClose={this.closeModal} shout={shout} />
                    </div>
                    <p>{shout.description}</p>
                </div>
                <div className="card-action">
                    <div className="card-action-box">
                        {(this.state.secondsLeft < 10 && this.state.secondsLeft != 0) ? (
                            <TransitiveNumber>{this.state.secondsLeft}</TransitiveNumber>
                        ) : ''}
                        <a href="#" className="right"><Icon icon="grade"/></a>
                    </div>
                </div>
                <div className="shout-progress">
                    <div className="progress">
                        <div className="determinate" style={{width}}></div>
                    </div>
                </div>
            </div>
        )
    }
})

export default Shout

