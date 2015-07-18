import React from 'react'
import { ModalContent, ModalFooter } from '../modal/Modal'
import DateTimePicker from '../partials/DateTimePicker'
import { Grid, Cell } from '../grid/Grid'
import moment from 'moment'

var ShoutForm = React.createClass({
    propTypes: {
        shout: React.PropTypes.object.isRequired,
        buttonName: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onDone: React.PropTypes.func.isRequired
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
    save() {
        this.props.onSave(this.state.shout)
    },
    cancel() {
        this.props.onDone()
    },
    render() {
        let { shout } = this.state
        let { buttonName } = this.props

        let { anonymous, forever, description } = shout

        let date = moment(shout.publish_until || moment()).format('YYYY-MM-DD')
        let time = moment(shout.publish_until || moment()).format('HH:mm:ss')

        return (
            <div>
                <ModalContent>
                    <Grid>
                        <Cell>
                            <div className="input-field">
                                <textarea
                                    placeholder="Wat wil je shouten?"
                                    className="materialize-textarea"
                                    value={description}
                                    onChange={this.setDescription}
                                    ref="description"/>
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

                    <button className="waves-effect waves-green btn-flat" onClick={this.save}>{buttonName}</button>
                    <button className="waves-effect waves-red btn-flat" onClick={this.cancel}>Annuleren</button>
                </ModalFooter>
            </div>
        )
    }
})

export default ShoutForm
