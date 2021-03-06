import React, { PropTypes } from 'react'

import API from 'API'
import assign from 'react/lib/Object.assign'
import Avatar from 'components/Avatar'
import CommentsForShout from './CommentsForShout'
import EditShout from '../components/EditShout'
import Emojify from 'Emojify'
import FileDrop from 'react-file-drop'
import Icon from 'Icon'
import moment from 'moment'
import Notification from 'NotificationActions'
import ReportShout from '../components/ReportShout'
import ShoutImages from './ShoutImages'
import ShoutName from './ShoutName'
import { Dropdown, DropdownTitle, DropdownContent } from 'Dropdown'
import { io } from 'Socket'
import { Link } from 'react-router'
import WebStorage from 'WebStorage'

let Shout = React.createClass({
    propTypes: {
        onHide: PropTypes.func.isRequired,
        openComments: PropTypes.bool,
        shout: PropTypes.object.isRequired,
    },
    getDefaultProps() {
        return {
            openComments: false
        }
    },
    _onChange(state) {
        this.setState(state)
    },
    getInitialState() {

        return {
            intervalId: null,
            openComments: this.props.openComments,
            reportModalOpen: false,
            secondsLeft: 0,
            width: '100%',
            toBeUploaded: [],
            favoriteCount: this.props.shout.meta.favorite_count || 0,
            favoritedByMe: this.props.shout.meta.favoritedByMe || false
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

        io.join(`shout.${shout.id}`, {
            BroadcastCommentHasBeenDeleted: response => onHide(shout),
            BroadcastShoutHasBeenFavorited: response => {
                this.setState({
                    favoriteCount: this.state.favoriteCount + 1
                })
            },
            BroadcastShoutHasBeenUnFavorited: response => {
                this.setState({
                    favoriteCount: this.state.favoriteCount - 1
                })
            },
            BroadcastShoutWasEdited: response => this.props.updateShout(shout),
            BroadcastShoutWasRemoved: response => this.props.onHide(shout, true)

        })
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
        API.put(`shouts/${shout.id}`, {
            anonymous: shout.anonymous,
            description: shout.description,
            publish_until: shout.publish_until,
            user_id: shout.user_id
        }, response => {
            Notification.success("Shout is bewerkt!")
        })

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

        API.del(`shouts/${this.props.shout.id}`, {}, d => {
            Notification.success("Shout is verwijderd!")
        })
    },
    toggleFavorite() {
        let id = this.props.shout.id
        let type = this.state.favoritedByMe ? 'unfavorite' : 'favorite'

        this.setState({
            favoritedByMe: ! this.state.favoritedByMe
        })

        API.post(`shouts/${id}/${type}`)
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
        let { favoriteCount, favoritedByMe, width, editModalOpen, reportModalOpen, openComments } = this.state
        let { anonymous } = shout

        let email = anonymous ? "anonymous@shout.nu" : shout.user.email

        let myShout = shout.meta.my_shout != null ? shout.meta.my_shout : shout.user_id == WebStorage.fromStore('user', {id:''}).id

        let whenMyShout = [
            <li key="edit"><a href onClick={this.openEditModal}><Icon icon="mode_edit"/> Bewerken</a></li>,
            <li key="delete"><a href onClick={this.onDelete}><Icon icon="delete"/> Verwijderen</a></li>,
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
                                        <span>{favoriteCount}</span>
                                        <Icon
                                            style={{ color: favoritedByMe ? '#ffab40' : 'rgba(0, 0, 0, .6)'}}
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
