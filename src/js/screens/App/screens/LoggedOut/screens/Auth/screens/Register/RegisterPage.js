import React from 'react'

import RegisterForm from './components/RegisterForm'
import { Card, CardTitle, CardContent } from 'Card'
import { Grid, Cell } from 'Grid'

var RegisterPage = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="section">
                    <Grid>
                        <Cell width={6/12} offset={3/12}>
                            <Card>
                                <CardContent>
                                    <CardTitle>Registreren</CardTitle>
                                    <RegisterForm />
                                </CardContent>
                            </Card>
                        </Cell>
                    </Grid>
                </div>
            </div>
        )
    }
})

export default RegisterPage
