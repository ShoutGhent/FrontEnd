import React from 'react'

import Avatar from '../../users/Avatar'
import InfoPanel from '../../partials/InfoPanel'
import { addons } from 'react/addons'
import { Card, CardContent, CardTitle } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'
var { PureRenderMixin } = addons

var EditProfilePicture = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    render() {
        let { user } = this.props

        return (
            <div>
                <Card>
                    <CardContent>
                        <CardTitle>Foto Wijzigen</CardTitle>

                        <Grid>
                            <Cell center>
                                <Avatar email={user.email} size={100} round/>
                            </Cell>
                            <Cell>
                                <InfoPanel>
                                    Je kan je afbeelding wijzigen op: <a href={`https://avatarize.me/?email=${user.email}`} target="_blank">avatarize.me</a>,
                                    heb je nog geen account, maak dan een met het volgende email adres: <strong>{user.email}</strong>
                                </InfoPanel>
                            </Cell>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        )
    }
})

export default EditProfilePicture
