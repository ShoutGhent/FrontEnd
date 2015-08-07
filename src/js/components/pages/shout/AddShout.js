import React, { PropTypes } from 'react'

import API from '../../../services/API'
import NotificationActions from '../../notification/NotificationActions'
import RouterContainer from '../../../services/RouterContainer'
import ShoutForm from '../../shout/ShoutForm'
import { Modal } from '../../modal/Modal'
import { Card } from '../../card/Card'

function getEmptyCleanShout(groupId) {
    return {
        description: '',
        anonymous: false,
        forever: true,
        publish_until: null,
        group_id: groupId
    }
}

var AddShout = React.createClass({
    propTypes: {
        onDone: PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            shout: getEmptyCleanShout(this.props.groupId)
        }
    },
    save(shout) {
        API.post('shouts/add', shout, (res, err) => {
            this.done()
            NotificationActions.success("Je shout werd geplaatst!")
        })
    },
    done() {
        this.props.onDone(this.state.shout)
        this.setState({
            shout: getEmptyCleanShout(this.props.groupId)
        })
    },
    render() {
        let { shout } = this.state

        return (
            <Card>
                <ShoutForm
                    type="card"
                    shout={shout}
                    onSave={this.save}
                    onDone={this.done}
                    buttonName="Shout!"
                />
            </Card>
        )
    }
})

export default AddShout
