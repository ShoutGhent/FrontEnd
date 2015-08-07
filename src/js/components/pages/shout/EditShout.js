import React, { PropTypes } from 'react'

import ShoutForm from '../../shout/ShoutForm'
import { Modal } from '../../modal/Modal'

var EditShout = React.createClass({
    propTypes: {
        isOpen: PropTypes.bool,
        onSave: PropTypes.func,
        onClose: PropTypes.func
    },
    done() {
        this.props.onClose()
    },
    save(shout) {
        this.props.onSave(shout)
        this.props.onClose()
    },
    render() {
        let { isOpen } = this.props

        return (
            <div>
                <Modal isOpen={isOpen} onClose={this.done}>
                    <ShoutForm
                        valid={true}
                        shout={this.props.shout}
                        onSave={this.save}
                        onDone={this.done}
                        buttonName="Wijzigen"
                    />
                </Modal>
            </div>
        )
    }
})

export default EditShout
