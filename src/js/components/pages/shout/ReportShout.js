import React from 'react'

import { Grid, Cell } from '../../grid/Grid'
import { Modal, ModalContent, ModalFooter } from '../../modal/Modal'

var ReportShout = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool.isRequired,
        onReport: React.PropTypes.func.isRequired,
        onClose: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            reason: ''
        }
    },
    report() {
        this.props.onReport(this.state)
        this.props.onClose()
    },
    cancel() {
        this.props.onClose()
    },
    setReason(event) {
        this.setState({
            reason: event.target.value
        })
    },
    render() {
        let { isOpen } = this.props

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalContent>
                        <Grid>
                            <Cell>
                                <div className="input-field">
                                    <textarea
                                        placeholder="Waarom?"
                                        className="materialize-textarea"
                                        onChange={this.setReason}
                                    />
                                </div>
                            </Cell>
                        </Grid>
                    </ModalContent>
                    <ModalFooter>
                        <button style={{float: 'right'}} className="waves-effect waves-green btn-flat" onClick={this.report}>Rapporteer</button>
                        <button style={{float: 'right'}} className="waves-effect waves-red btn-flat" onClick={this.cancel}>Annuleren</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
})

export default ReportShout
