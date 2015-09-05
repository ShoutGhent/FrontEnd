import React, { PropTypes } from 'react'

import MyGroupsStore from './MyGroupsStore'
import WebStorage from '../../services/WebStorage'
import GroupList from './GroupList'

var GroupListNearMe = React.createClass({
    propTypes: {
        onFetched: PropTypes.func
    },
    getDefaultProps() {
        return {
            onFetched: () => {}
        }
    },
    getInitialState() {
        return MyGroupsStore.getState()
    },
    componentDidMount() {
        MyGroupsStore.listen(this._onChange)
    },
    componentWillUnmount() {
        MyGroupsStore.unlisten(this._onChange)
    },
    _onChange(state) {
        if ( ! state.loading) {
            this.props.onFetched(state.myGroups)
        }
        this.setState(state)
    },

    render() {
        let { groupsNearMe, loading } = this.state

        return (
            <GroupList
                title="Groepen in de buurt"
                groups={groupsNearMe}
                loading={loading}
            />
        )
    }
})

export default GroupListNearMe
