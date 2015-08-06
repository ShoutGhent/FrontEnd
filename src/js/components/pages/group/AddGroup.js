import React, { PropTypes } from 'react'

import API from '../../../services/API'
import MaterialTextarea from '../../partials/MaterialTextarea'
import RouterContainer from '../../../services/RouterContainer'
import ShoutForm from '../../shout/ShoutForm'
import { Grid, Cell } from '../../grid/Grid'
import { Modal, ModalContent, ModalFooter } from '../../modal/Modal'

var AddGroup = React.createClass({
    propTypes: {
        isOpen: PropTypes.bool.isRequired,
        onDone: PropTypes.func.isRequired,
        onClose: PropTypes.func
    },
    getDefaultProps() {
        return {
            onClose: () => {}
        }
    },
    getInitialState() {
        return {
            name: '',
            type: 'open',
            nameIsValid: false
        }
    },
    save() {
        let payload = {
            name: this.state.name,
            type: this.state.type
        }

        API.post('groups/add', payload, (res, err) => {
            RouterContainer.get().transitionTo('group', { groupId: res.id })
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
    validateName(result) {
        this.setState({
            nameIsValid: result
        })
    },
    closeModal() {
        this.props.onClose()
    },
    render() {
        let { isOpen } = this.props
        let { type, nameIsValid } = this.state
        let valid = nameIsValid

        return (
            <div>
                <Modal isOpen={isOpen} onClose={this.closeModal}>
                    <ModalContent>
                        <Grid>
                            <Cell>
                                <MaterialTextarea
                                    onValidate={this.validateName}
                                    rules={['required']}
                                    placeholder="Groep Naam"
                                    className="materialize-textarea"
                                    onChange={this.setName}
                                />
                            </Cell>
                            <Cell>
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
                            </Cell>
                        </Grid>
                    </ModalContent>
                    <ModalFooter>
                        <button style={{float: 'right'}} disabled={ ! valid} className="waves-effect waves-green btn" onClick={this.save}>Maak Groep</button>
                        <button style={{float: 'right'}} className="waves-effect waves-red btn-flat" onClick={this.done}>Annuleren</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
})

export default AddGroup
