import React, { PropTypes } from 'react'

import API from '../../services/API'
import Comment from './Comment'
import Loading from '../loading/Loading'
import Notification from '../notification/NotificationActions'
import { Button, Input } from '../Material/Material'
import { Collection, CollectionItem } from '../collection/Collection'
import { Grid, Cell } from '../grid/Grid'
import { io } from '../../services/Socket'

var CommentsForShout = React.createClass({
    propTypes: {
        shout: PropTypes.object.isRequired,
        onCloseRequest: PropTypes.func,
        channelKey: PropTypes.string.isRequired,
    },
    getDefaultProps() {
        return {
            onCloseRequest: () => {},
        }
    },
    getInitialState() {
        return {
            boxHeight: 50,
            comments: [],
            loading: true,
            newComment: "",
            next_page_url: null,
        }
    },
    componentWillMount() {
        API.get(`shouts/${this.props.shout.id}/comments`, {}, (res, err) => {
            if ( ! err) {
                this.setState({
                    loading: false,
                    next_page_url: res.next_page_url,
                    comments: res.data
                })

                io.listen(`${this.props.channelKey}:BroadcastCommentedOnShout`, (data) => {
                    this.appendNewComment(data.comment)
                })

                this.scrollToBottom()
            }
        })
    },
    componentDidMount() {
        let channelKey = `shout.${this.props.shout.id}`
        io.join(channelKey)

        io.listen(`${channelKey}:BroadcastCommentHasBeenDeleted`, data => this.removeCommentFromList(data.comment_id))
    },
    loadMoreComments(evt) {
        evt.preventDefault()
        this.setState({ loading: true })
        let url = this.state.next_page_url.replace('/?', '?')

        if (this.state.comments.length > 0) {
            var box = React.findDOMNode(this.refs[`item-${this.state.comments[0].id}`])
        } else {
            var box = {
                offsetTop: 0
            }
        }

        API.get(url, {}, (res, err) => {
            if ( ! err) {
                let { comments } = this.state
                comments.push(...res.data)

                this.setState({
                    loading: false,
                    next_page_url: res.next_page_url,
                    comments: comments
                })

                var offset = box.offsetTop
                this.scrollTo(offset - 20)
            }
        })
    },
    addComment(event) {
        event.preventDefault()
        let comment = this.state.newComment

        if (comment != "") {
            API.post(`shouts/${this.props.shout.id}/comment`, { comment }, (res, err) => {
                if ( ! err) {
                    this.appendNewComment(res.comment)
                }
            })
        }

        this.setState({ newComment: '' })
    },
    updateComment(comment) {
        if (comment.comment != '') {
            API.put(`shouts/${this.props.shout.id}/comment`, { comment: comment.comment, comment_id: comment.id }, (res, err) => {
                if ( ! err) {
                    Notification.success('Je reactie is gewijzigd!')
                }
            })
            this.replaceComment(comment)
        }
    },
    replaceComment(comment) {
        let { comments } = this.state
        comments = comments.map(oldComment => {
            if (oldComment.id == comment.id) {
                return comment
            }

            return oldComment
        })

        this.setState({ comments })
        this.fixBoxHeight()
    },
    setNewComment(event) {
        this.setState({
            newComment: event.target.value
        })
    },
    handleKeyboard(event) {
        if(event.keyCode == 27) {
            this.props.onCloseRequest()
        }
    },
    scrollTo(offset) {
        let { comments } = this.state

        if (comments.length > 0) {
            React.findDOMNode(this.refs.comments).scrollTop = offset
        }
    },
    scrollToBottom() {
        if (this.refs.comments) {
            let box = React.findDOMNode(this.refs.comments)
            box.scrollTop = box.scrollHeight
            this.setState({
                boxHeight: box.scrollHeight
            })
        }
    },
    fixBoxHeight() {
        this.setState({ boxHeight: 50 }, () => {
            if (this.refs.comments) {
                let box = React.findDOMNode(this.refs.comments)
                this.setState({
                    boxHeight: box.scrollHeight
                })
            }
        })
    },
    deleteComment(comment) {
        API.del(`shouts/${this.props.shout.id}/comment`, { comment_id: comment.id }, (res, err) => {
            if ( ! err) {
                this.removeCommentFromList(res.comment_id)
            }
        })
    },
    removeCommentFromList(id) {
        let { comments } = this.state
        comments = comments.filter(comment => id != comment.id)
        this.setState({ comments })
        this.fixBoxHeight()
    },
    appendNewComment(comment) {
        let { comments } = this.state
        let pushIt = true
        comments.forEach(c => {
            if (c.id == comment.id) {
                pushIt = false
            }
        })

        if (pushIt) {
            comments.push(comment)
            this.setState({ comments })
            this.scrollToBottom()
        }
    },
    setCommentDescription(comment, text) {
        let { comments } = this.state

        comments[comments.indexOf(comment)].comment = text

        this.setState({ comments })
    },
    renderAllComments(comments) {
        let { next_page_url, boxHeight } = this.state

        return (
            <CollectionItem noPadding>
                <Collection noMargin noBorder ref="comments" style={{
                    overflowY: 'auto',
                    maxHeight: 450,
                    height: boxHeight
                }}>
                    <span>
                        {next_page_url && (
                            <CollectionItem noPadding>
                                <Button onClick={this.loadMoreComments} full rectangular flat>Meer Laden</Button>
                            </CollectionItem>
                        )}
                    </span>

                    <span>
                        {comments.map(comment => (
                            <Comment
                                comment={comment}
                                key={`item-${comment.id}`}
                                onDeleteComment={this.deleteComment}
                                ref={`item-${comment.id}`}
                                resizeBox={this.fixBoxHeight}
                                onUpdateComment={this.updateComment}
                                onReplaceComment={this.replaceComment}
                                setCommentDescription={text => this.setCommentDescription(comment, text)}
                            />
                        ))}
                    </span>
                </Collection>
            </CollectionItem>
        )
    },
    renderWhenNoComments(loading) {
        return ! loading ? (
            <CollectionItem>
                <span className="blue-text">
                    Wees de eerste om een reactie te plaatsen!
                </span>
            </CollectionItem>
        ) : null
    },
    render() {
        let { newComment, loading, comments } = this.state

        comments = comments.sort((a, b) => {
            var first = a.created_at
            var last = b.created_at

            return (first < last) ? -1 : (first > last) ? 1 : 0
        })

        return (
            <div className="comments">
                <Collection>
                    {loading && <CollectionItem>
                        Even geduld...
                        <Loading/>
                    </CollectionItem>}

                    { comments.length > 0 ? this.renderAllComments(comments) : this.renderWhenNoComments(loading)}

                    <CollectionItem>
                        <Grid>
                            <Cell>
                                <form onSubmit={this.addComment}>
                                    <Input
                                        autoFocus={true}
                                        label="Wat wil je reageren?"
                                        name="comment"
                                        onChange={this.setNewComment}
                                        onKeyDown={this.handleKeyboard}
                                        type="text"
                                        value={newComment}
                                    />
                                </form>
                                <span className="right">Druk op enter om te reageren</span>
                            </Cell>
                        </Grid>
                    </CollectionItem>
                </Collection>
            </div>
        )
    }
})

export default CommentsForShout
