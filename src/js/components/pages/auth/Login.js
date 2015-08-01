import React from 'react'
import LoginForm from '../../users/Login'
import { Grid, Cell } from '../../grid/Grid'
import { Card, CardTitle, CardContent } from '../../card/Card'

var Login = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="section">
                    <Grid>
                        <Cell width={6/12} offset={3/12}>
                            <Card>
                                <CardContent>
                                    <CardTitle>Aanmelden</CardTitle>
                                    <LoginForm />
                                </CardContent>
                            </Card>
                        </Cell>
                    </Grid>
                </div>
            </div>
        )
    }
})

export default Login
