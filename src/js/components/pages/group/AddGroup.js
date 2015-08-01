import React from 'react'
import { Modal, ModalContent, ModalFooter } from '../../modal/Modal'
import ShoutForm from '../../shout/ShoutForm'
import API from '../../../services/API'
import RouterContainer from '../../../services/RouterContainer'
import MaterialInput from '../../partials/MaterialInput'

var AddGroup = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool.isRequired,
        onDone: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            name: '',
            type: 'open'
        }
    },
    save() {
        let payload = {
            name: this.state.name,
            type: this.state.type
        }

        API.post('groups/add', payload, (res, err) => {
            RouterContainer.get().transitionTo('group', { groupId: res.uuid })
        })
        this.done(payload)
    },
    done(group) {
        this.props.onDone(group)
        this.setState({ name: '', type: 'open' })
    },
    setName(event) {
        this.setState({
            name: event.target.value
        })
    },
    setType(event) {
        this.setState({
            type: event.target.value
        })
    },
    render() {
        let { isOpen } = this.props
        let { type } = this.state

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalContent>
                        <MaterialInput label="Groep Naam" type="email" id="email" name="email" onChange={this.setName} focus/>
                        <ul className="list-unstyled">
                            <li>
                                <input checked={type == 'open'} className="with-gap" name="open_type" id="open_type" type="radio" value="open" onChange={this.setType}/>
                                <label htmlFor="open_type">Open Groep</label>
                            </li>
                            <li>
                                <input checked={type == 'closed'} className="with-gap" name="closed_type" id="closed_type" type="radio" value="closed" onChange={this.setType}/>
                                <label htmlFor="closed_type">Gesloten Groep</label>
                            </li>
                            <li className="hidden">
                                <input checked={type == 'secret'} className="with-gap" name="secret_type" id="secret_type" type="radio" value="secret" onChange={this.setType}/>
                                <label htmlFor="secret_type">Secret Groep</label>
                            </li>
                        </ul>
                    </ModalContent>
                    <ModalFooter>
                        <button style={{float: 'right'}} className="waves-effect waves-green btn-flat" onClick={this.save}>Maak Groep</button>
                        <button style={{float: 'right'}} className="waves-effect waves-red btn-flat" onClick={this.done}>Annuleren</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
})

export default AddGroup
