import React, { PropTypes } from 'react/addons'

import DateTimePicker from '../partials/DateTimePicker'
import MaterialTextarea from '../partials/MaterialTextarea'
import moment from 'moment'
import { CardContent, CardFooter } from '../card/Card'
import { Grid, Cell } from '../grid/Grid'
import { ModalContent, ModalFooter } from '../modal/Modal'

var ShoutForm = React.createClass({
    propTypes: {
        shout: PropTypes.object.isRequired,
        buttonName: PropTypes.string.isRequired,
        onSave: PropTypes.func.isRequired,
        onDone: PropTypes.func.isRequired,
        valid: PropTypes.bool,
        type: PropTypes.string
    },
    getInitialState() {
        let { shout } = this.props

        return {
            shout: JSON.parse(JSON.stringify(shout)),
            descriptionIsValid: this.props.valid
        }
    },
    getDefaultProps() {
        return {
            valid: false,
            type: 'modal'
        }
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
    save(event) {
        event.preventDefault()

        this.props.onSave(this.state.shout)
    },
    cancel(event) {
        event.preventDefault()
        this.props.onDone()
    },
    validateDescription(result) {
        this.setState({ descriptionIsValid: result })
    },
    render() {
        let { shout, descriptionIsValid } = this.state
        let { buttonName, type } = this.props

        let { anonymous, forever, description } = shout

        let date = moment(shout.publish_until || moment()).format('YYYY-MM-DD')
        let time = moment(shout.publish_until || moment()).format('HH:mm')

        let isValid = descriptionIsValid

        let Content = type == 'modal' ? ModalContent : CardContent
        let Footer = type == 'modal' ? ModalFooter : CardFooter

        return (
            <div>
                <form onSubmit={this.save}>
                    <Content>
                        <Grid>
                            <Cell>
                                <MaterialTextarea
                                    rules={['required', 'min:3']}
                                    onValidate={this.validateDescription}
                                    placeholder="Wat wil je shouten?"
                                    className="materialize-textarea"
                                    value={description}
                                    onChange={this.setDescription}
                                />
                            </Cell>
                        </Grid>
                        { ! forever ? (
                            <DateTimePicker onChange={this.setPublishUntil} date={date} time={time}/>
                        ) : ''}

                        <Grid>
                            <Cell width={3/12}>
                                <span>
                                    <input type="checkbox" id="anonymous" checked={anonymous} onChange={this.setAnonymous} />
                                    <label htmlFor="anonymous">Anoniem</label>
                                </span>
                            </Cell>
                            <Cell width={9/12}>
                                <span>
                                    <input type="checkbox" id="forever" checked={forever} onChange={this.setForever} />
                                    <label htmlFor="forever">Voor altijd tonen</label>
                                </span>
                            </Cell>
                        </Grid>
                    </Content>
                    <Footer>
                        <button disabled={ ! isValid} style={{float: 'right'}} className="waves-effect waves-green btn">{buttonName}</button>
                        <button style={{float: 'right'}} className="waves-effect waves-red btn-flat" onClick={this.cancel}>Annuleren</button>
                    </Footer>
                </form>
            </div>
        )
    }
})

export default ShoutForm
