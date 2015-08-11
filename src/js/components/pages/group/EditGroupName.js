import React, { PropTypes } from 'react'

import API from '../../../services/API'
import LoginActions from '../../../auth/LoginActions'
import MaterialInput from '../../partials/MaterialInput'
import Notification from '../../notification/NotificationActions'
import { Button } from '../../button/MaterialButton'
import { Card, CardContent, CardTitle, CardFooter } from '../../card/Card'

var EditGroupName = React.createClass({
    propTypes: {
        group: PropTypes.object.isRequired,
        onChange: PropTypes.func
    },
    getDefaultProps() {
        return {
            onChange: () => {}
        }
    },
    getInitialState() {
        let { group } = this.props

        return {
            name: group.name,
            nameIsValid: true
        }
    },
    changeName(event) {
        this.setState({
            name: event.target.value
        })
    },
    edit(event) {
        event.preventDefault()

        let { name } = this.state

        API.post(`groups/${this.props.group.id}/name`, { name }, (data) => {
            this.props.onChange(data)
            Notification.success('Groep naam is gewijzigd!')
        })
    },
    validName(result) {
        this.setState({
            nameIsValid: result
        })
    },
    render() {
        let { name, nameIsValid } = this.state
        let isValid = nameIsValid

        return (
            <div>
                <form onSubmit={this.edit}>
                    <Card>
                        <CardContent>
                            <CardTitle>Naam Wijzigen</CardTitle>
                                <MaterialInput
                                    onValidate={this.validName}
                                    rules={['required']}
                                    label="Groep Naam"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={this.changeName}
                                    type="text"
                                />
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

export default EditGroupName
