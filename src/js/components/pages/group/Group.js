import React from 'react'

import API from '../../../services/API'

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
            {group ? (
                <h3>{group.name}</h3>
            ) : (
                <h3>Geen Groep</h3>
            )}

            </div>
        )
    }
})

export default GroupPage
