import React from 'react'
import { Modal } from '../../modal/Modal'
import ShoutForm from '../../shout/ShoutForm'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

function getEmptyCleanShout() {
    return {
        description: '',
        anonymous: false,
        forever: false,
        publish_until: null
    }
}

var AddShout = React.createClass({
    mixins: [PureRenderMixin],
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
        console.log(shout)
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
