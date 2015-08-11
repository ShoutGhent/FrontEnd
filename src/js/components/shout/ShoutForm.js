import React, { PropTypes } from 'react/addons'

import DateTimePicker from '../partials/DateTimePicker'
import MaterialTextarea from '../partials/MaterialTextarea'
import moment from 'moment'
import { Button } from '../button/MaterialButton'
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
        var { shout } = this.props

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
        var shout = this.state.shout

        shout.description = event.target.value

        this.setState({ shout })
    },
    setAnonymous(event) {
        var shout = this.state.shout

        shout.anonymous = event.target.checked

        this.setState({ shout })
    },
    setForever(event) {
        var shout = this.state.shout

        shout.forever = event.target.checked

        if (shout.forever) {
            shout.publish_until = null
        }

        this.setState({ shout })
    },
    setPublishUntil(data) {
        var { date, time } = data

        var shout = this.state.shout

        shout.publish_until = moment(`${date} ${time}`).format("YYYY-MM-DD HH:mm:ss")

        this.setState({ shout })
    },
    save(event) {
        event.preventDefault()

        this.props.onSave(this.state.shout)
        this.setState(this.getInitialState())
    },
    validateDescription(result) {
        this.setState({ descriptionIsValid: result })
    },
    render() {
        var { shout, descriptionIsValid } = this.state
        var { buttonName, type } = this.props

        var { anonymous, forever, description } = shout

        var date = moment(shout.publish_until || moment()).format('YYYY-MM-DD')
        var time = moment(shout.publish_until || moment()).format('HH:mm')

        var isValid = descriptionIsValid

        var Content = type == 'modal' ? ModalContent : CardContent
        var Footer = type == 'modal' ? ModalFooter : CardFooter

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
                                    <input type="checkbox" id={`anonymous.shout.${shout.id || 'add'}`} checked={anonymous} onChange={this.setAnonymous} />
                                    <label htmlFor={`anonymous.shout.${shout.id || 'add'}`}>Anoniem</label>
                                </span>
                            </Cell>
                            <Cell width={9/12}>
                                <span>
                                    <input type="checkbox" id={`forever.shout.${shout.id || 'add'}`} checked={forever} onChange={this.setForever} />
                                    <label htmlFor={`forever.shout.${shout.id || 'add'}`}>Voor altijd tonen</label>
                                </span>
                            </Cell>
                        </Grid>
                    </Content>
                    <Footer>
                        <Button disabled={ ! isValid} right>{buttonName}</Button>
                    </Footer>
                </form>
            </div>
        )
    }
})

export default ShoutForm
