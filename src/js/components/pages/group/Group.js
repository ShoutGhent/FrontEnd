import React from 'react'

import API from '../../../services/API'
import ShoutForm from '../../shout/ShoutForm'
import ShoutFeed from '../../shout/ShoutFeed'
import { Card, CardContent, CardTitle } from '../../card/Card'

let GroupPage = React.createClass({
    getInitialState() {
        return {
            group: null
        }
    },
    componentDidMount() {
        let { groupId } = this.props.params

        API.get(`groups/${groupId}`, {}, (group, err) => {
            if ( ! err) {
                if (this.isMounted()) {
                    this.setState({ group })
                }
            }
        })
    },
    render() {
        let { group } = this.state

        return (
            <div className="container">
                <Card>
                    <CardContent>
                        <CardTitle>
                            {group ? (group.name) : ('Geen Groep')}
                        </CardTitle>
                    </CardContent>
                </Card>

                {group ? (
                    <ShoutFeed url={`shouts/group/${group.id}`}/>
                ): ''}
            </div>
        )
    }
})

export default GroupPage
