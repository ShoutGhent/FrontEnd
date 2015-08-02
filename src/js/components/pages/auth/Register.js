import React from 'react'

import RegisterForm from '../../users/Register'
import { Card, CardTitle, CardContent } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'

var Register = React.createClass({
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

export default Register
