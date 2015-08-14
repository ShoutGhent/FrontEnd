import React, { PropTypes } from 'react'

import MyGroupsStore from './MyGroupsStore'
import WebStorage from '../../services/WebStorage'
import GroupList from './GroupList'

var MyGroupList = React.createClass({
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
        this.setState(state)
    },

    render() {
        let { myGroups, loading } = this.state

        return (
            <GroupList
                title="Mijn Groepen"
                groups={myGroups}
                loading={loading}
            />
        )
    }
})

export default MyGroupList
