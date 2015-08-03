import React from 'react'

import Avatar from '../users/Avatar'
import EditShout from '../pages/shout/EditShout'
import Icon from '../partials/Icon'
import moment from 'moment'
import ReportShout from '../pages/shout/ReportShout'
import TransitiveNumber from 'react-transitive-number'
import WebStorage from '../../services/WebStorage'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import { Link } from 'react-router'

moment.locale('nl')

let Shout = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired,
        shout: React.PropTypes.object.isRequired,
        onHide: React.PropTypes.func.isRequired,
        onEdit: React.PropTypes.func.isRequired,
        onReport: React.PropTypes.func.isRequired
    },
    getInitialState() {
        let { shout } = this.props

        return {
            width: '100%',
            intervalId: null,
            currentUser: WebStorage.fromStore('user'),
            editModalOpen: false,
            reportModalOpen: false,
            shout: shout,
            secondsLeft: 0
        }
    },
    calcPercentage(shout, onHide) {
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
                    onHide(shout)
                }
            }, 500)

            this.setState({
                intervalId: interval
            })
        }
    },
    componentDidMount() {
        let { shout, onHide } = this.props
        this.calcPercentage(shout, onHide)
    },
    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    },
    openReportModal(event) {
        event.preventDefault()
        this.setState({
            reportModalOpen: true
        })
    },
    openEditModal(event) {
        event.preventDefault()
        this.setState({
            editModalOpen: true
        })
    },
    save(shout) {
        this.setState({ shout })

        this.props.onEdit(shout)

        this.calcPercentage(shout, this.props.onHide)
    },
    report(data) {
        this.props.onReport({
            shout_id: this.state.shout.id,
            reason: data.reason
        })
    },
    closeEditModal() {
        this.setState({
            editModalOpen: false
        })
    },
    closeReportModal() {
        this.setState({
            reportModalOpen: false
        })
    },
    render() {
        let { currentUser, width, editModalOpen, reportModalOpen, shout } = this.state
        let { anonymous } = shout

        let user = this.props.user

        let anonymousName = 'Anonymous'

        let name = anonymous ? anonymousName : user.full_name
        let email = anonymous ? anonymousName : user.email

        let myShout = currentUser.id == user.id

        let whenMyShout = [
            <li key="edit"><a href onClick={this.openEditModal}>Edit</a></li>,
            //null ? <li><a href onClick={(event) => {event.preventDefault}}>Republish</a></li> : ''
        ]

        let whenNotMyShout = [
            <li key="report">
                <a href onClick={this.openReportModal}>Rapporteren</a>
                <ReportShout isOpen={reportModalOpen} onReport={this.report} onClose={this.closeReportModal} />
            </li>
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
                                <div className="more">
                                    <Icon icon="more_vert"/>
                                </div>
                            </DropdownTitle>
                            <DropdownContent top={0}>
                                <li><Link to="shout" params={{shoutId: shout.id}}>Permalink</Link></li>
                                {myShout ? whenMyShout.map(item => item) : ''}
                                {!myShout ? whenNotMyShout.map(item => item) : ''}
                            </DropdownContent>
                        </Dropdown>
                        <EditShout isOpen={editModalOpen} onSave={this.save} onClose={this.closeEditModal} shout={shout} />
                    </div>
                    <p>{shout.description}</p>
                </div>
                <div className="card-action">
                    <div className="card-action-box">
                        {(this.state.secondsLeft < 10 && this.state.secondsLeft != 0) ? (
                            <TransitiveNumber>{this.state.secondsLeft}</TransitiveNumber>
                        ) : ''}
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

