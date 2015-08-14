import React, { PropTypes } from 'react'

import Avatar from '../users/Avatar'
import EditShout from '../pages/shout/EditShout'
import Icon from '../partials/Icon'
import moment from 'moment'
import ReportShout from '../pages/shout/ReportShout'
import TransitiveNumber from 'react-transitive-number'
import WebStorage from '../../services/WebStorage'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import { Link } from 'react-router'

let Shout = React.createClass({
    propTypes: {
        user: PropTypes.object.isRequired,
        shout: PropTypes.object.isRequired,
        onHide: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onReport: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onToggleFavorite: PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            width: '100%',
            intervalId: null,
            currentUser: WebStorage.fromStore('user'),
            editModalOpen: false,
            reportModalOpen: false,
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
        this.props.onEdit(shout)

        this.calcPercentage(shout, this.props.onHide)
    },
    report(data) {
        this.props.onReport({
            shout_id: this.props.shout.id,
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
    onDelete(event) {
        event.preventDefault()

        this.props.onDelete(this.props.shout)
    },
    toggleFavorite() {
        this.props.onToggleFavorite(this.props.shout)
    },
    render() {
        let { user, shout } = this.props
        let { width, editModalOpen, reportModalOpen } = this.state
        let { anonymous } = shout

        let anonymousName = 'Anonymous'

        let name = anonymous ? anonymousName : user.full_name
        let email = anonymous ? anonymousName : user.email

        let myShout = shout.meta.my_shout

        let whenMyShout = [
            <li key="edit"><a href onClick={this.openEditModal}>Bewerken</a></li>,
            <li key="delete"><a href onClick={this.onDelete}>Verwijderen</a></li>
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
                        {editModalOpen && <EditShout
                            isOpen={editModalOpen}
                            onSave={this.save}
                            onClose={this.closeEditModal}
                            shout={shout}
                        />}
                    </div>
                    <p style={{whiteSpace: 'pre-line'}}>{shout.description}</p>
                </div>
                <div className="card-action">
                    {(this.state.secondsLeft < 10 && this.state.secondsLeft != 0) ? (
                        <TransitiveNumber>{this.state.secondsLeft}</TransitiveNumber>
                    ) : ''}

                    <span className="right">
                        <TransitiveNumber>{shout.meta.favorite_count}</TransitiveNumber>
                        <button onClick={this.toggleFavorite} style={{
                            background: 'transparent',
                            margin: 0,
                            padding: 0,
                            border: 0
                        }}>
                            <span
                                style={{
                                    fontSize: 16,
                                    verticalAlign: 'middle',
                                    color: shout.meta.favorited_by_me ? '#ffab40' : 'rgba(0, 0, 0, .6)',
                                    marginTop: -2,
                                    marginLeft: 5
                                }}
                                className="material-icons"
                            >star</span>
                        </button>
                    </span>
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

