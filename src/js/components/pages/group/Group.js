import React from 'react'

import AddShout from '../../pages/shout/AddShout'
import API from '../../../services/API'
import Icon from '../../partials/Icon'
import Loading from '../../loading/Loading'
import ShoutFeed from '../../shout/ShoutFeed'
import ShoutForm from '../../shout/ShoutForm'
import { Card, CardContent, CardTitle } from '../../card/Card'
import NotificationActions from '../../notification/NotificationActions'

let GroupPage = React.createClass({
    getInitialState() {
        return {
            group: null,
            loading: true,
            isAddShoutFormOpen: false
        }
    },
    componentDidMount() {
        let { groupId } = this.props.params

        API.get(`groups/${groupId}`, {}, (group, err) => {
            if ( ! err) {
                if (this.isMounted()) {
                    this.setState({ group, loading: false })
                }
            }
        })
    },
    shoutWasAdded(shout) {
        this.setState({
            isAddShoutFormOpen: false
        })
        NotificationActions.success("Je shout werd geplaatst!")
    },
    openAddShoutForm() {
        this.setState({
            isAddShoutFormOpen: true
        })
    },
    render() {
        let { group, loading, isAddShoutFormOpen } = this.state

        return (
            <div className="container">
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Card>
                        <CardContent>
                            <button className="btn-floating right" onClick={this.openAddShoutForm}>
                                <Icon icon="add"/>
                            </button>
                            <CardTitle>{group.name}</CardTitle>
                        </CardContent>
                    </Card>
                    <AddShout groupId={group.id} isOpen={isAddShoutFormOpen} onDone={this.shoutWasAdded}/>
                    <ShoutFeed url={`shouts/group/${group.id}`}/>
                </div>
            )}
            </div>
        )
    }
})

export default GroupPage
