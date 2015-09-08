import React, { PropTypes } from 'react'

import MaterialTextarea from '../../partials/MaterialTextarea'
import { Button } from '../../button/MaterialButton'
import { Grid, Cell } from '../../grid/Grid'
import { Modal, ModalContent, ModalFooter } from '../../modal/Modal'

var ReportShout = React.createClass({
    propTypes: {
        isOpen: PropTypes.bool.isRequired,
        onReport: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            reason: '',
            reasonIsValid: false
        }
    },
    report(event) {
        event.preventDefault()
        let payload = {
            reason: this.state.reason
        }

        this.props.onReport(payload)
        this.props.onClose()
    },
    cancel(event) {
        event.preventDefault()
        this.props.onClose()
    },
    setReason(event) {
        this.setState({
            reason: event.target.value
        })
    },
    validateReason(result) {
        this.setState({
            reasonIsValid: result
        })
    },
    render() {
        let { isOpen } = this.props
        let { reasonIsValid, reason } = this.state

        let isValid = reasonIsValid

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <form onSubmit={this.report}>
                        <ModalContent>
                            <Grid>
                                <Cell>
                                    <div className="input-field">
                                        <MaterialTextarea
                                            className="materialize-textarea"
                                            onChange={this.setReason}
                                            onValidate={this.validateReason}
                                            placeholder="Waarom?"
                                            rules={['required', 'min:20']}
                                            value={reason}
                                        />
                                    </div>
                                </Cell>
                            </Grid>
                        </ModalContent>
                        <ModalFooter>
                            <Button disabled={ ! isValid} right>Rapporteer</Button>
                            <Button onClick={this.cancel} right flat>Annuleren</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        )
    }
})

export default ReportShout
