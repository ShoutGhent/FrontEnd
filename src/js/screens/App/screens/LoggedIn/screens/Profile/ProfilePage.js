import React from 'react'

import Avatar from 'components/Avatar'
import ShoutFeed from 'ShoutFeed'
import { Card, CardContent, CardFooter } from 'Card'
import { Grid, Cell } from 'Grid'
import { Link } from 'react-router'

let ProfilePage = React.createClass({
    render() {
        let { currentUser } = this.props
        
        return (
            <div className="container">
                <Grid>
                    <Cell width={8/12}>
                        <ShoutFeed url="shouts/mine" />
                    </Cell>
                    <Cell width={4/12}>
                        <Card>
                            <div className="center">
                                <CardContent>
                                    <Avatar email={currentUser.email} round/>
                                    <h5>{currentUser.full_name}</h5>
                                </CardContent>
                                <CardFooter>
                                    <Link to="settings" params={{tabId: 'general'}}>Instellingen</Link>
                                </CardFooter>
                            </div>
                        </Card>
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default ProfilePage
