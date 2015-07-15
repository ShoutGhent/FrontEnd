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
    setAnonymous(event) {
        let shout = this.state.shout

        shout.anonymous = ! shout.anonymous

        this.setState({ shout })
    },
    closeModal() {
        this.props.onClose()
    },
    save() {
        this.props.onSave(this.state.shout)
        this.props.onClose()
    },
    componentDidUpdate() {
        let node = React.findDOMNode(this.refs.description)
        if (node) {
            node.focus()
            let originalValue = node.value

            // Nice Hack to focus at end of textarea
            node.value += " "
            node.value = originalValue
        }
    },
    render() {
        let { isOpen } = this.props

        let anonymous = this.state.shout.anonymous

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalContent>
                        <div className="input-field">
                            <textarea className="materialize-textarea" value={this.state.shout.description} onChange={this.setDescription} ref="description"/>
                        </div>
                    </ModalContent>
                    <ModalFooter>
                        <div className="footer-left">
                            <span>
                                <input type="checkbox" id="anonymous" checked={anonymous} onChange={this.setAnonymous} />
                                <label htmlFor="anonymous">Anoniem</label>
                            </span>
                        </div>

                        <button className="waves-effect waves-green btn-flat" onClick={this.save}>Wijzigen</button>
                        <button className="waves-effect waves-red btn-flat" onClick={this.closeModal}>Annuleren</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
})

export default EditShout
