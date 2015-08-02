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
            last_name: user.last_name
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
    edit() {
        let { first_name, last_name } = this.state

        API.post('users/me/changeName', this.state, (data) => {
            Notification.success('Je naam werd gewijzigd!')
            LoginActions.changeUserInformation({
                first_name,
                last_name,
                full_name: first_name + ' ' + last_name
            })
        })
    },
    render() {
        let { first_name, last_name } = this.state

        return (
            <div>
                <Card>
                    <CardContent>
                        <CardTitle>Naam Wijzigen</CardTitle>
                        <Grid>
                            <Cell width={6/12}>
                                <MaterialInput label="Voornaam" id="first_name" value={first_name} onChange={this.changeFirstName} type="text"/>
                            </Cell>
                            <Cell width={6/12}>
                                <MaterialInput label="Achternaam" id="last_name" value={last_name} onChange={this.changeLastName} type="text"/>
                            </Cell>
                        </Grid>
                    </CardContent>
                    <CardFooter>
                        <button style={{float: 'right', marginTop: -8}} onClick={this.edit} className="waves-effect waves-green btn-flat">Wijzigen</button>
                    </CardFooter>
                </Card>
            </div>
        )
    }
})

export default EditName
