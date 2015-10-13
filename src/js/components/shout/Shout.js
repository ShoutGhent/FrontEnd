import React, { PropTypes } from 'react'

import API from '../../services/API'
import Avatar from '../users/Avatar'
import CommentsForShout from './CommentsForShout'
import EditShout from '../pages/shout/EditShout'
import Emojify from '../partials/Emojify'
import FileDrop from 'react-file-drop'
import { Gmaps, Marker } from 'react-gmaps'
import Icon from '../partials/Icon'
import moment from 'moment'
import ReportShout from '../pages/shout/ReportShout'
import ShoutImages from './ShoutImages'
import ShoutName from './ShoutName'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import { io } from '../../services/Socket'
import { Link } from 'react-router'

let Shout = React.createClass({
    propTypes: {
        onDelete: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired,
        onReport: PropTypes.func.isRequired,
        onToggleFavorite: PropTypes.func.isRequired,
        openComments: PropTypes.bool,
        shout: PropTypes.object.isRequired,
        updateShout: PropTypes.func,
    },
    getDefaultProps() {
        return {
            updateShout: () => {},
            openComments: false
        }
    },
    getInitialState() {
        return {
            editModalOpen: false,
            intervalId: null,
            openComments: this.props.openComments,
            reportModalOpen: false,
            secondsLeft: 0,
            width: '100%',
            toBeUploaded: []
        }
    },
    calcPercentage(shout, onHide) {
        let { updated_at, publish_until} = shout

        let begin = moment(updated_at).format('X')
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

        let channelKey = `shout.${shout.id}`
        io.join(channelKey)

        io.listen(`${channelKey}:shout.events.comments.BroadcastCommentedOnShout`, data => this.props.updateShout(shout, data.shout))
        io.listen(`${channelKey}:shout.events.comments.BroadcastCommentHasBeenDeleted`, data => this.props.updateShout(shout, data.shout))
        io.listen(`${channelKey}:shout.events.shouts.BroadcastShoutHasBeenFavorited`, data => this.props.updateShout(shout, data.shout))
        io.listen(`${channelKey}:shout.events.shouts.BroadcastShoutHasBeenUnFavorited`, data => this.props.updateShout(shout, data.shout))
        io.listen(`${channelKey}:shout.events.shouts.BroadcastShoutWasEdited`, data => this.props.updateShout(shout, data.shout))
        io.listen(`${channelKey}:shout.events.shouts.BroadcastShoutWasRemoved`, data => this.props.onHide(shout, true))
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
    isAllowedImage(file) {
        let valids = ['image/jpeg', 'image/png']

        for(var i = 0; i < valids.length; i++) {
            if (valids[i] == file.type) {
                return true
            }
        }

        return false
    },
    uploadImages(files, event) {
        for(var i = 0; i < files.length; i++) {
            let file = files.item(i)

            if (this.isAllowedImage(file)) {
                let reader = new FileReader()

                reader.onload = e => {
                    let { toBeUploaded } = this.state
                    let imageObject = {
                        file: file,
                        url: reader.result
                    }

                    toBeUploaded.push(imageObject)
                    this.setState({ toBeUploaded }, () => {
                        this.uploadImageTo(this.props.shout.id, imageObject)
                    })
                }

                reader.readAsDataURL(file)
            }
        }
    },
    uploadImageTo(shoutId, imageObject) {
        API.postFile(`shouts/${shoutId}/image`, { key: 'image', value: imageObject.file }, (res, err) => {
            if ( ! err) {
                let { toBeUploaded } = this.state
                toBeUploaded = toBeUploaded.filter(obj => obj.url != imageObject.url)
                this.props.updateShout(res)
                this.setState({ toBeUploaded })
            }
        })
    },
    render() {
        let { shout } = this.props
        let { width, editModalOpen, reportModalOpen, openComments } = this.state
        let { anonymous } = shout

        let email = anonymous ? "anonymous@shout.nu" : shout.user.email

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
                <div className="card" style={{position:'relative'}}>
                    {myShout && (<FileDrop onDrop={this.uploadImages}><span>Sleep hier afbeelding(en) naartoe</span></FileDrop>)}

                    <div className="card-content black-text">
                        <div className="card-title black-text">
                            <a href="#">
                                <Avatar email={email} size={35}/>
                            </a>
                            <span className="shout__name">
                                <ShoutName shout={shout} />
                            </span>
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
                        </div>

                        {editModalOpen ? (
                            <EditShout
                                isOpen={editModalOpen}
                                onSave={this.save}
                                onClose={this.closeEditModal}
                                shout={shout}
                            />
                        ) : (
                            <p style={{whiteSpace: 'pre-wrap'}}>
                                <Emojify>{shout.description}</Emojify>
                            </p>
                        )}
                    </div>

                    <ShoutImages
                        images={shout.images}
                        toBeUploaded={this.state.toBeUploaded}
                    />

                    <div className="card-action">
                    {(this.state.secondsLeft < 10 && this.state.secondsLeft != 0) && (
                        <span>{this.state.secondsLeft}</span>
                    )}

                        <span className="right">
                            <ul className="shout__action-items">

                                {shout.location && (
                                    <li style={{position: 'relative'}}>
                                        <Icon icon='location_on'/>
                                    </li>
                                )}

                                <li>
                                    <button onClick={this.toggleComments} style={{
                                        background: 'transparent',
                                        margin: 0,
                                        padding: 0,
                                        border: 0
                                    }}>
                                        <span>{shout.meta.comment_count}</span>
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
                                        <span>{shout.meta.favorite_count}</span>
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
                    channelKey={`shout.${shout.id}`}
                    onCloseRequest={this.closeComments}
                    shout={shout}
                />}
            </div>
        )
    }
})

export default Shout
