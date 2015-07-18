import React from 'react'
import { Link } from 'react-router'
import { Grid, Cell } from '../../grid/Grid'
import ShoutList from '../../shout/ShoutList'
import Avatar from '../../users/Avatar'
import { Card, CardContent, CardFooter } from '../../card/Card'

let Profile = React.createClass({
    render() {
        return (
            <div>
                <div className="container">
                    <Grid>
                        <Cell width={8/12}>
                            <ShoutList url="shouts/mine" />
                        </Cell>
                        <Cell width={4/12}>
                            <Card>
                                <div className="center">
                                    <CardContent>
                                        <Avatar email="malfait.robin@gmail.com" round/>
                                    </CardContent>
                                    <CardFooter>
                                        <Link to="settings">Instellingen</Link>
                                    </CardFooter>
                                </div>
                            </Card>
                        </Cell>
                    </Grid>
                </div>
            </div>
        )
    }
})

export default Profile
