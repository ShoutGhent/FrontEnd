import React, { PropTypes } from 'react'

import Log from 'Log'
import { Grid, Cell } from 'Grid'

var NotificationPage = React.createClass({
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

export default NotificationPage
