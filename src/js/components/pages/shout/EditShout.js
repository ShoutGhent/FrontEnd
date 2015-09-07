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
        return (
            <ShoutForm
                valid={true}
                shout={this.props.shout}
                onSave={this.save}
                onDone={this.done}
                buttonName="Wijzigen"
            />
        )
    }
})

export default EditShout
