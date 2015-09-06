import React, { PropTypes } from 'react'

import Avatar from '../users/Avatar'
import CommentsForShout from './CommentsForShout'
import EditShout from '../pages/shout/EditShout'
import Emojify from '../partials/Emojify'
import Icon from '../partials/Icon'
import moment from 'moment'
import ReportShout from '../pages/shout/ReportShout'
import TransitiveNumber from 'react-transitive-number'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import { Link } from 'react-router'

let Shout = React.createClass({
    propTypes: {
        shout: PropTypes.object.isRequired,
        onHide: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onReport: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onToggleFavorite: PropTypes.func.isRequired,
        updateCommentCount: PropTypes.func,
        openComments: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            updateCommentCount: () => {},
            openComments: false
        }
    },
    getInitialState() {
        return {
            width: '100%',
            intervalId: null,
            editModalOpen: false,
            reportModalOpen: false,
            secondsLeft: 0,
            openComments: this.props.openComments
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
    toggleComments() {
        this.setState({
            openComments: ! this.state.openComments
        })
    },
    closeComments() {
        this.setState({
            openComments: false
        })
    },
    updateCommentCount(count) {
        this.props.updateCommentCount(this.props.shout, count)
    },
    render() {
        let { shout } = this.props
        let { width, editModalOpen, reportModalOpen, openComments } = this.state
        let { anonymous } = shout

        let anonymousName = 'Anonymous'

        let name = anonymous ? anonymousName : shout.user.full_name
        let email = anonymous ? anonymousName : shout.user.email

        let myShout = shout.meta.my_shout

        let whenMyShout = [
            <li key="edit"><a href onClick={this.openEditModal}><Icon icon="mode_edit"/> Bewerken</a></li>,
            <li key="delete"><a href onClick={this.onDelete}><Icon icon="delete"/> Verwijderen</a></li>
            //null ? <li><a href onClick={(event) => {event.preventDefault}}>Republish</a></li> : ''
        ]

        let whenNotMyShout = [
            <li key="report">
                <a href onClick={this.openReportModal}><Icon icon="report"/> Rapporteren</a>
                <ReportShout isOpen={reportModalOpen} onReport={this.report} onClose={this.closeReportModal} />
            </li>
        ]

        return (
            <div className="shout">
                <div className="card">
                    <div className="card-content black-text">
                        <div className="card-title black-text">
                            <a href="#">
                                <Avatar email={email} size={35}/>
                            </a>
                            <Emojify>{name}</Emojify>
                            <Dropdown className="right">
                                <DropdownTitle>
                                    <div className="more">
                                        <Icon icon="more_vert"/>
                                    </div>
                                </DropdownTitle>
                                <DropdownContent top={0}>
                                    <li>
                                        <Link to="shout" params={{shoutId: shout.id}}>
                                            <Icon icon="link"/> Link
                                        </Link>
                                    </li>
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
                        <p style={{whiteSpace: 'pre-wrap'}}>
                            <Emojify>{shout.description}</Emojify>
                        </p>
                    </div>
                    <div className="card-action">
                    {(this.state.secondsLeft < 10 && this.state.secondsLeft != 0) ? (
                        <TransitiveNumber>{this.state.secondsLeft}</TransitiveNumber>
                    ) : ''}

                        <span className="right">
                            <ul className="shout__action-items">
                            {shout.location && <li><Icon icon='location_on'/></li>}
                                <li>
                                    <button onClick={this.toggleComments} style={{
                                        background: 'transparent',
                                        margin: 0,
                                        padding: 0,
                                        border: 0
                                    }}>
                                        <TransitiveNumber>{shout.meta.comment_count}</TransitiveNumber>
                                        <Icon icon="comment"/>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={this.toggleFavorite} style={{
                                        background: 'transparent',
                                        margin: 0,
                                        padding: 0,
                                        border: 0
                                    }}>
                                        <TransitiveNumber>{shout.meta.favorite_count}</TransitiveNumber>
                                        <Icon
                                            style={{ color: shout.meta.favorited_by_me ? '#ffab40' : 'rgba(0, 0, 0, .6)'}}
                                            icon="star"
                                        />
                                    </button>
                                </li>
                            </ul>
                        </span>
                    </div>
                    <div className="shout-progress">
                        <div className="progress">
                            <div className="determinate" style={{width}}></div>
                        </div>
                    </div>
                </div>
                {openComments && <CommentsForShout
                    shout={shout}
                    updateCommentCount={this.updateCommentCount}
                    onCloseRequest={this.closeComments}
                />}
            </div>
        )
    }
})

export default Shout
