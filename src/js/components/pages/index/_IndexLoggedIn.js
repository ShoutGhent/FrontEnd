import React from 'react'

import ShoutFeed from '../../shout/ShoutFeed'
import API from '../../../services/API'
import JoinInitialGroupModal from '../../partials/JoinInitialGroupModal'

var _IndexLoggedIn = React.createClass({
    getInitialState() {
        return {
            groups: [],
            doneFetching: false
        }
    },
    componentDidMount() {
        API.get('groups/mine', {}, (response, err) => {
            this.setState({
                groups: response.data,
                doneFetching: true
            })
        })
    },
    render() {
        let { doneFetching, groups } = this.state

        return (
            <div className="container">
                {doneFetching && groups.length <= 0 ? (
                    <JoinInitialGroupModal></JoinInitialGroupModal>
                ) : ''}
                <ShoutFeed url="shouts" />
            </div>
        )
    }
})

export default _IndexLoggedIn
