import React from 'react'
import { Modal, ModalContent, ModalFooter } from '../../modal/Modal'
import DateTimePicker from '../../partials/DateTimePicker'
import { Grid, Cell } from '../../grid/Grid'
import moment from 'moment'

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
    //componentDidUpdate(a) {
    //    if (this.props.isOpen) {
    //        let node = React.findDOMNode(this.refs.description)
    //        if (node) {
    //            node.focus()
    //            let originalValue = node.value
    //
    //            // Nice Hack to focus at end of textarea
    //            node.value += " "
    //            node.value = originalValue
    //        }
    //    }
    //},
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
    setForever() {
        let shout = this.state.shout

        shout.forever = ! shout.forever

        if (shout.forever) {
            shout.publish_until = null
        }

        this.setState({ shout })
    },
    setPublishUntil(data) {
        let { date, time } = data

        let shout = this.state.shout

        shout.publish_until = moment(`${date} ${time}`).format("YYYY-MM-DD HH:mm:ss")

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
        let { shout } = this.state

        let { anonymous, forever } = shout

        let date = moment(shout.publish_until || moment()).format('YYYY-MM-DD')
        let time = moment(shout.publish_until || moment()).format('HH:mm:ss')

        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalContent>
                        <Grid>
                            <Cell>
                                <div className="input-field">
                                    <textarea className="materialize-textarea" value={this.state.shout.description} onChange={this.setDescription} ref="description"/>
                                </div>
                            </Cell>
                        </Grid>
                        { ! forever ? (
                            <DateTimePicker onChange={this.setPublishUntil} date={date} time={time}/>
                        ) : ''}
                    </ModalContent>
                    <ModalFooter>
                        <div className="footer-left">
                            <span>
                                <input type="checkbox" id="anonymous" checked={anonymous} onChange={this.setAnonymous} />
                                <label htmlFor="anonymous">Anoniem</label>
                            </span>
                            <span>
                                <input type="checkbox" id="forever" checked={forever} onChange={this.setForever} />
                                <label htmlFor="forever">Voor altijd tonen</label>
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
