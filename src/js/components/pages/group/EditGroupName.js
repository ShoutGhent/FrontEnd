import React, { PropTypes } from 'react'

import API from '../../../services/API'
import Notification from '../../notification/NotificationActions'
import { Button, Input } from '../../Material/Material'
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

        API.post(`groups/${this.props.group.id}/name`, { name }, () => {
            this.props.onChange({ name })
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
                                <Input
                                    id="name"
                                    label="Groep Naam"
                                    name="name"
                                    onChange={this.changeName}
                                    onValidate={this.validName}
                                    rules={['required']}
                                    type="text"
                                    value={name}
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
