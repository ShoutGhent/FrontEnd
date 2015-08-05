import React from 'react'

import API from '../../../services/API'
import GroupList from '../../group/GroupList'
import JoinInitialGroupModal from '../../partials/JoinInitialGroupModal'
import ShoutFeed from '../../shout/ShoutFeed'
import { Grid, Cell } from '../../grid/Grid'

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
                <Grid>
                    <Cell width={3/12}>
                        <GroupList />
                    </Cell>
                    <Cell width={9/12}>
                        <ShoutFeed url="shouts" />
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default _IndexLoggedIn
