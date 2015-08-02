import React from 'react'

import API from '../../../services/API'
import LoginActions from '../../../auth/LoginActions'
import MaterialInput from '../../partials/MaterialInput'
import Notification from '../../notification/NotificationActions'
import { Card, CardContent, CardTitle, CardFooter } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'

var EditName = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    getInitialState() {
        let { user } = this.props
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            isValid: true,
            firstNameIsValid: true,
            lastNameIsValid: true
        }
    },
    changeFirstName(event) {
        this.setState({
            first_name: event.target.value
        })
    },
    changeLastName(event) {
        this.setState({
            last_name: event.target.value
        })
    },
    edit(event) {
        event.preventDefault()

        let { first_name, last_name } = this.state

        API.post('users/me/changeName', { first_name, last_name }, (data) => {
            let { first_name, last_name, full_name } = data
            LoginActions.changeUserInformation({ first_name, last_name, full_name })

            Notification.success('Je naam werd gewijzigd!')
        })
    },
    validFirstName(result) {
        this.setState({
            firstNameIsValid: result
        })
    },
    validLastName(result) {
        this.setState({
            lastNameIsValid: result
        })
    },
    render() {
        let { first_name, last_name, firstNameIsValid, lastNameIsValid } = this.state
        let isValid = firstNameIsValid && lastNameIsValid

        return (
            <div>
                <form onSubmit={this.edit}>
                    <Card>
                        <CardContent>
                            <CardTitle>Naam Wijzigen</CardTitle>
                            <Grid>
                                <Cell width={6/12}>
                                    <MaterialInput onValidate={this.validFirstName} validate rules={['required']} label="Voornaam" name="first_name" id="first_name" value={first_name} onChange={this.changeFirstName} type="text"/>
                                </Cell>
                                <Cell width={6/12}>
                                    <MaterialInput onValidate={this.validLastName} validate rules={['required']} label="Achternaam" name="last_name" id="last_name" value={last_name} onChange={this.changeLastName} type="text"/>
                                </Cell>
                            </Grid>
                        </CardContent>
                        <CardFooter>
                            <button style={{float: 'right', marginTop: -8}} disabled={ ! isValid} className="waves-effect waves-green btn">Wijzigen</button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
})

export default EditName
