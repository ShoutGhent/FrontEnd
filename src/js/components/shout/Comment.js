import React, { PropTypes } from 'react'

import LoginStore from '../../auth/LoginStore'
import Emojify from '../partials/Emojify'
import { Button } from '../button/MaterialButton'
import { CollectionItem } from '../collection/Collection'
import Avatar from '../users/Avatar'
import Icon from '../partials/Icon'
import MaterialInput from '../partials/MaterialInput'
import { io } from '../../services/Socket'

var Comment = React.createClass({
    propTypes: {
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func.isRequired,
        onReplaceComment: PropTypes.func.isRequired,
        onUpdateComment: PropTypes.func.isRequired,
        resizeBox: PropTypes.func.isRequired,
        setCommentDescription: PropTypes.func.isRequired,
    },
    componentDidMount() {
        let channelKey = `comment.${this.props.comment.id}`
        io.join(channelKey)

        io.listen(`${channelKey}:shout.events.comments.BroadcastCommentHasBeenEdited`, data => this.props.onReplaceComment(data.comment))
    },
    getInitialState() {
        return {
            updateMode: false,
            commentDescription: this.props.comment.comment,
            isHovering: false
        }
    },
    toggleUpdateMode() {
        this.setState({ updateMode: ! this.state.updateMode }, this.props.resizeBox)
    },
    updateComment(event) {
        event.preventDefault()
        if (this.props.comment.comment.trim() == "") {
            this.props.setCommentDescription(this.state.commentDescription)
        }

        this.props.onUpdateComment(this.props.comment)
        this.setState({
            updateMode: false
        }, this.props.resizeBox)
    },
    setCommentDescription(event) {
        var text = event.target.value
        this.props.setCommentDescription(text)
    },
    handleKeyboard(event) {
        if (event.keyCode == 27) {
            this.props.setCommentDescription(this.state.commentDescription)
            this.setState({
                updateMode: false
            }, this.props.resizeBox)
        }
    },
    setIsHovering() {
        this.setState({ isHovering: true })
    },
    setIsNotHovering() {
        this.setState({ isHovering: false })
    },
    render() {
        let { updateMode, isHovering } = this.state
        let { comment, onDeleteComment } = this.props

        return (
            <CollectionItem onMouseEnter={this.setIsHovering} onMouseLeave={this.setIsNotHovering}>
                <div className="left" style={{marginTop: 5, width: 30, marginRight: 10}}>
                    <Avatar email={comment.user.email} size={25}/>
                </div>
                <div className="left" style={{width: 'calc(100% - 40px)'}}>
                    <small>
                        <Emojify>{comment.user.first_name}</Emojify>
                    </small>

                    <span>
                    {LoginStore.isMine(comment.user.id) && isHovering && (
                        <span className="right">
                            <Button padding="0 11px" flat onClick={this.toggleUpdateMode}>
                                <Icon style={{fontSize: 14}} icon="edit"/>
                            </Button>

                            <Button padding="0 11px" flat onClick={() => {onDeleteComment(comment)}}>
                                <Icon style={{fontSize: 14}} icon="delete"/>
                            </Button>
                        </span>
                    )}
                    </span>

                    <br/>
                    {updateMode ? (
                        <form onSubmit={this.updateComment}>
                            <MaterialInput
                                autoFocus={true}
                                onChange={this.setCommentDescription}
                                onKeyUp={this.handleKeyboard}
                                type="text"
                                value={comment.comment}
                            />
                            <span className="right">Druk op enter om te bewerken</span>
                        </form>
                    ) : (
                        <span style={{whiteSpace: 'pre-line'}}><Emojify>{comment.comment}</Emojify></span>
                    )}
                </div>
            </CollectionItem>
        )
    }
})

export default Comment
