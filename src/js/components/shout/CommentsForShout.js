import React, { PropTypes } from 'react'

import API from '../../services/API'
import Avatar from '../users/Avatar'
import Emojify from '../partials/Emojify'
import Icon from '../partials/Icon'
import Loading from '../loading/Loading'
import MaterialInput from '../partials/MaterialInput'
import TransitiveNumber from 'react-transitive-number'
import { Button } from '../button/MaterialButton'
import { Collection, CollectionItem } from '../collection/Collection'
import { Grid, Cell } from '../grid/Grid'

var CommentsForShout = React.createClass({
    propTypes: {
        shout: PropTypes.object.isRequired,
        updateCommentCount: PropTypes.func,
        onCloseRequest: PropTypes.func,
    },
    getDefaultProps() {
        return {
            updateCommentCount: () => {},
            onCloseRequest: () => {},
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

                this.scrollToBottom()
            }
        })
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
                res.data.map(comment => {
                    comments.push(comment)
                })

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
        API.post(`shouts/${this.props.shout.id}/comment`, { comment: this.state.newComment }, (res, err) => {
            if ( ! err) {
                this.props.updateCommentCount(res.shout.meta.comment_count)
                this.appendNewComment(res.comment)
            }
        })
        this.setState({ newComment: '' })
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
    appendNewComment(comment) {
        let { comments } = this.state
        comments.push(comment)
        this.setState({ comments })
        this.scrollToBottom()
    },
    renderComment(comment) {
        return (<CollectionItem key={`item-${comment.id}`} ref={`item-${comment.id}`}>
            <div className="left" style={{marginTop: 5, width: 30, marginRight: 10}}>
                <Avatar email={comment.user.email} size={25}/>
            </div>
            <div className="left" style={{width: 'calc(100% - 40px)'}}>
                <small><Emojify>{comment.user.first_name}</Emojify></small><br/>
                <span style={{whiteSpace: 'pre-line'}}><Emojify>{comment.comment}</Emojify></span>
            </div>
        </CollectionItem>)
    },
    render() {
        let { newComment, loading, comments, next_page_url, boxHeight } = this.state

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

                    { comments.length > 0 ? (
                        <CollectionItem noPadding>
                            <Collection noMargin noBorder ref="comments" style={{
                                overflowY: 'auto',
                                maxHeight: 450,
                                height: boxHeight
                            }}>
                                {next_page_url && <CollectionItem noPadding>
                                    <Button onClick={this.loadMoreComments} full rectangular flat>Meer Laden</Button>
                                </CollectionItem>}

                                {comments.map(this.renderComment)}
                            </Collection>
                        </CollectionItem>
                    ) : (
                    ! loading && (
                        <CollectionItem>
                            <span className="blue-text">
                                Wees de eerste om een reactie te plaatsen!
                            </span>
                        </CollectionItem>
                    )
                    )}

                    <CollectionItem>
                        <Grid>
                            <Cell>
                                <form onSubmit={this.addComment}>
                                    <MaterialInput
                                        autoFocus={true}
                                        label="Wat wil je reageren?"
                                        multiline={true}
                                        name="comment"
                                        onChange={this.setNewComment}
                                        onKeyDown={this.handleKeyboard}
                                        onValidate={() => {}}
                                        rules={['required']}
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
