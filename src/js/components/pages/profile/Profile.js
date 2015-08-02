import React from 'react'

import Avatar from '../../users/Avatar'
import ShoutList from '../../shout/ShoutList'
import { Card, CardContent, CardFooter } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'
import { Link } from 'react-router'

let Profile = React.createClass({
    render() {
        let { currentUser } = this.props
        
        return (
            <div className="container">
                <Grid>
                    <Cell width={8/12}>
                        <ShoutList url="shouts/mine" />
                    </Cell>
                    <Cell width={4/12}>
                        <Card>
                            <div className="center">
                                <CardContent>
                                    <Avatar email={currentUser.email} round/>
                                </CardContent>
                                <CardFooter>
                                    <Link to="settings">Instellingen</Link>
                                </CardFooter>
                            </div>
                        </Card>
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default Profile
