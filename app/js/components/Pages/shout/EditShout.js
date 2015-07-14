import React from 'react'
import { Modal, ModalContent, ModalFooter } from '../../modal/Modal'

var EditShout = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool,
        onSave: React.PropTypes.func,
        onClose: React.PropTypes.func
    },
    getInitialState() {
        let { shout } = this.props

        return { shout }
    },
    setDescription(event) {
        let shout = this.state.shout

        shout.description = event.target.value

        this.setState({ shout })
    },
    closeModal() {
        this.props.onClose()
    },
    save() {
        this.props.onSave(this.state.shout)
        this.props.onClose()
    },
    render() {
        let { isOpen } = this.props

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalContent>
                        <div className="input-field">
                            <textarea className="materialize-textarea" value={this.state.shout.description} onChange={this.setDescription}/>
                        </div>
                    </ModalContent>
                    <ModalFooter>
                        <button className="waves-effect waves-green btn-flat" onClick={this.save}>Wijzigen</button>
                        <button className="waves-effect waves-red btn-flat" onClick={this.closeModal}>Annuleren</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
})

export default EditShout
