import React, { PropTypes } from 'react'

import API from '../../../services/API'
import NotificationActions from '../../notification/NotificationActions'
import RouterContainer from '../../../services/RouterContainer'
import ShoutForm from '../../shout/ShoutForm'
import { Modal } from '../../modal/Modal'

function getEmptyCleanShout(groupId) {
    return {
        description: '',
        anonymous: false,
        forever: false,
        publish_until: null,
        group_id: groupId
    }
}

var AddShout = React.createClass({
    propTypes: {
        isOpen: PropTypes.bool.isRequired,
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
        let { isOpen } = this.props
        let { shout } = this.state

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ShoutForm shout={shout} onSave={this.save} onDone={this.done} buttonName="Shout!"/>
                </Modal>
            </div>
        )
    }
})

export default AddShout
