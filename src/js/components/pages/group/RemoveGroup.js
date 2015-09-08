import React, { PropTypes } from 'react'

import API from '../../../services/API'
import Notification from '../../notification/NotificationActions'
import { Button } from '../../button/MaterialButton'
import { Card, CardContent, CardTitle, CardFooter } from '../../card/Card'

var RemoveGroup = React.createClass({
    propTypes: {
        group: PropTypes.object.isRequired,
        onChange: PropTypes.func
    },
    getDefaultProps() {
        return {
            onDelete: () => {}
        }
    },
    remove(event) {
        event.preventDefault()

        API.del(`groups/${this.props.group.id}`, {}, (data, err) => {
            this.props.onDelete(data)
            Notification.success('Groep is verwijderd!')
        })
    },
    render() {
        return (
            <div>
                <form onSubmit={this.remove}>
                    <Card className="red lighten-1">
                        <CardContent light>
                            <CardTitle light>Groep Verwijderen</CardTitle>
                            <span>Het verwijderen van een groep is permanent en kan niet ongedaan gemaakt worden!</span>
                        </CardContent>
                        <CardFooter>
                            <Button right>Verwijderen</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
})

export default RemoveGroup
