import React, { PropTypes } from 'react'

import { Button, Textarea } from 'forms/material/Material'
import { Grid, Cell } from 'Grid'
import { Modal, ModalContent, ModalFooter } from 'Modal'

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
                                        <Textarea
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
