import React from 'react'
import { Modal } from '../../modal/Modal'
import ShoutForm from '../../shout/ShoutForm'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var EditShout = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        isOpen: React.PropTypes.bool,
        onSave: React.PropTypes.func,
        onClose: React.PropTypes.func
    },
    done() {
        this.props.onClose()
    },
    save(shout) {
        this.props.onSave(shout)
        this.props.onClose()
    },
    render() {
        let { isOpen, shout } = this.props

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ShoutForm shout={shout} onSave={this.save} onDone={this.done} buttonName="Wijzigen"/>
                </Modal>
            </div>
        )
    }
})

export default EditShout
