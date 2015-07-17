import React from 'react'
import { Grid, Cell } from '../../grid/Grid'
import ShoutList from '../../shout/ShoutList'
import Avatar from '../../users/Avatar'

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
                            <Avatar email="malfait.robin@gmail.com" size={300}/>
                        </Cell>
                    </Grid>
                </div>
            </div>
        )
    }
})

export default Profile
