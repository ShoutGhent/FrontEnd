import React, { PropTypes } from 'react'

import Log from '../../log/Log'
import { Grid, Cell } from '../../grid/Grid'

var Notifications = React.createClass({
    render() {
        return (
            <div className="container notification-page">
                <Grid>
                    <Cell>
                        <Log />
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default Notifications
