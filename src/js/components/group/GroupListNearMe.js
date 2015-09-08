import React, { PropTypes } from 'react'

import GroupList from './GroupList'
import MyGroupsStore from './MyGroupsStore'

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
                groups={groupsNearMe}
                loading={loading}
                title="Groepen in de buurt"
            />
        )
    }
})

export default GroupListNearMe
