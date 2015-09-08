import React, { PropTypes } from 'react'

import API from '../../../services/API'
import GroupActions from '../../pages/group/GroupActions'
import MaterialTextarea from '../../partials/MaterialTextarea'
import Redirect from "../../../services/Redirect"
import ShoutForm from '../../shout/ShoutForm'
import { Button } from '../../button/MaterialButton'
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
            Redirect.to('group', {
                groupId: res.id,
                tabId: 'shouts'
            })
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
                                    className="materialize-textarea"
                                    onChange={this.setName}
                                    onValidate={this.validateName}
                                    placeholder="Groep Naam"
                                    rules={['required']}
                                    value={this.state.name}
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
                        <Button disabled={ ! valid} onClick={this.save} right>Maak Groep</Button>
                        <Button onClick={this.done} right flat>Annuleren</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
})

export default AddGroup
