import React from 'react'

import LoginForm from './components/LoginForm'
import { Card, CardTitle, CardContent } from 'Card'
import { Grid, Cell } from 'Grid'

var LoginPage = React.createClass({
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

export default LoginPage
