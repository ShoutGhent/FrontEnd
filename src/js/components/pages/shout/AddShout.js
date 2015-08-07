import React, { PropTypes } from 'react'

import API from '../../../services/API'
import NotificationActions from '../../notification/NotificationActions'
import ShoutForm from '../../shout/ShoutForm'
import { Card } from '../../card/Card'

var AddShout = React.createClass({
    propTypes: {
        onDone: PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            cleanShout: {
                description: '',
                anonymous: false,
                forever: true,
                publish_until: null,
                group_id: this.props.groupId,
            }
        }
    },
    addShout(shout) {
        API.post('shouts/add', shout, (res, err) => {
            this.done(res)
            NotificationActions.success("Je shout werd geplaatst!")
        })
    },
    done(shout) {
        this.props.onDone(shout)
        this.setState({
            cleanShout: {
                description: '',
                anonymous: false,
                forever: true,
                publish_until: null,
                group_id: this.props.groupId,
            }
        })
    },
    render() {
        console.log("Rendering")
        return (
            <Card>
                <ShoutForm
                    type="card"
                    shout={this.state.cleanShout}
                    onSave={this.addShout}
                    onDone={this.done}
                    buttonName="Shout!"
                />
            </Card>
        )
    }
})

export default AddShout
