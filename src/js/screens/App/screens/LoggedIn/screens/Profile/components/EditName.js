import React, { PropTypes } from 'react'

import API from 'API'
import { Button, Input } from 'forms/material/Material'
import LoginActions from 'LoginActions'
import Notification from 'NotificationActions'
import { Card, CardContent, CardTitle, CardFooter } from 'Card'
import { Grid, Cell } from 'Grid'

var EditName = React.createClass({
    propTypes: {
        user: PropTypes.object.isRequired
    },
    getInitialState() {
        let { user } = this.props
        return {
            first_name: user.first_name,
            last_name: user.last_name,
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
                                    <Input
                                        id="first_name"
                                        label="Voornaam"
                                        name="first_name"
                                        onChange={this.changeFirstName}
                                        onValidate={this.validFirstName}
                                        rules={['required']}
                                        type="text"
                                        value={first_name}
                                    />
                                </Cell>
                                <Cell width={6/12}>
                                    <Input
                                        id="last_name"
                                        label="Achternaam"
                                        name="last_name"
                                        onChange={this.changeLastName}
                                        onValidate={this.validLastName}
                                        rules={['required']}
                                        type="text"
                                        value={last_name}
                                    />
                                </Cell>
                            </Grid>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={ ! isValid} right>Wijzigen</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
})

export default EditName
