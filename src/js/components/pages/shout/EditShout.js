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
                buttonName="Wijzigen"
                hasCancelButton={true}
                onDone={this.done}
                onSave={this.save}
                shout={this.props.shout}
                valid={true}
            />
        )
    }
})

export default EditShout
