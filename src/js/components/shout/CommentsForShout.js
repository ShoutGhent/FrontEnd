import React, { PropTypes } from 'react'

import Avatar from '../users/Avatar'
import MaterialInput from '../partials/MaterialInput'
import TransitiveNumber from 'react-transitive-number'
import { Button } from '../button/MaterialButton'
import { Collection, CollectionItem } from '../collection/Collection'
import { Grid, Cell } from '../grid/Grid'

var CommentsForShout = React.createClass({
    propTypes: {
        shout: PropTypes.object.isRequired
    },
    loadMoreComments(evt) {
        evt.preventDefault()
        alert("Meer laden")
    },
    render() {
        let { shout } = this.props
        let { email, first_name } = shout.user

        return (
            <div className="comments">
                <Collection>
                    <CollectionItem noPadding>
                        <Button onClick={this.loadMoreComments} full rectangular flat>Meer Laden</Button>
                    </CollectionItem>
                    <CollectionItem>
                        <div className="left" style={{marginTop: 5}}>
                            <Avatar email={email} size={25}/>
                        </div>
                        <div className="left">
                            <small>{first_name}</small><br/>
                            <span style={{whiteSpace: 'pre-line'}}>Ik zeg altijd, beter een scheetje voor iedereen dan buikpijn voor mij alleen!</span>
                        </div>
                    </CollectionItem>
                    <CollectionItem>
                        <div className="left" style={{marginTop: 5}}>
                            <Avatar email={'mike.brants@ugent.be'} size={25}/>
                        </div>
                        <div className="left">
                            <small>{first_name}</small><br/>
                            <span style={{whiteSpace: 'pre-line'}}>Serieus...</span>
                        </div>
                    </CollectionItem>
                    <CollectionItem>
                        <div className="left" style={{marginTop: 5}}>
                            <Avatar email={'yigit.abbas@ugent.be'} size={25}/>
                        </div>
                        <div className="left">
                            <small>{first_name}</small><br/>
                            <span style={{whiteSpace: 'pre-line'}}>
                                Ja ja mannen, niet normaal ze...
                            </span>
                        </div>
                    </CollectionItem>

                    <CollectionItem>
                        <Grid>
                            <Cell>
                                <MaterialInput
                                    autoFocus={true}
                                    label="Wat wil je reageren?"
                                    name="id"
                                    type="text"
                                    onChange={() => {}}
                                />
                                <span className="right">Druk op enter om te reageren</span>
                            </Cell>
                        </Grid>
                    </CollectionItem>
                </Collection>
            </div>
        )
    }
})

export default CommentsForShout
