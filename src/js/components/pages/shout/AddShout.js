import React from 'react'
import { Modal } from '../../modal/Modal'
import ShoutForm from '../../shout/ShoutForm'
import API from '../../../services/API'
import RouterContainer from '../../../services/RouterContainer'

function getEmptyCleanShout() {
    return {
        description: '',
        anonymous: false,
        forever: false,
        publish_until: null
    }
}

var AddShout = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool.isRequired,
        onDone: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            shout: getEmptyCleanShout()
        }
    },
    save(shout) {
        API.post('shouts/add', shout, (res, err) => {
            RouterContainer.get().transitionTo('shout', { shoutId: res.uuid })
        })
        this.done()
    },
    done() {
        this.props.onDone(this.state.shout)
        this.setState({
            shout: getEmptyCleanShout()
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
