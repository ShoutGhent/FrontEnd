import React from 'react'
import { Link } from 'react-router'
import Parallax from '../../partials/Parallax'
import Headline from '../../partials/Headline'
import Icon from '../../partials/Icon'
import { Grid, Cell } from '../../grid/Grid'
import { Gmaps, Marker } from 'react-gmaps'

var _IndexLoggedOut = React.createClass({
    render() {
        let map = {
            height: 400
        }

        let coords = {
            lat: 51.0393565,
            lng: 3.7271276
        }

        return (
            <div>
                <div>
                    <Parallax img='http://d.pr/i/1c42M+'>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div id="index-banner">
                            <div className="section">
                                <div className="container">
                                    <h1 className="header center white-text text-lighten-2">Shout!</h1>
                                    <Grid>
                                        <Cell center>
                                            <h5 className="header light white-text">Gooi het in de groep!</h5>
                                        </Cell>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </Parallax>

                    <div className="container">
                        <div className="section">
                            <div className="row">
                                <Grid>
                                    <Cell width={12/12} center>
                                        <p className="left-align light">
                                            We zijn drie studenten die zich engageren om de sociale netwerksite Shout te ontwikkelen voor de hogeschool- en universiteitsstudenten in Gent.
                                        </p>
                                        <p className="left-align light">
                                            Shout heeft als doel om studentenverenigingen te helpen met het verwerven van sponsors, maar daarnaast ook om het Gentse studentenleven online te brengen.
                                        </p>
                                    </Cell>
                                </Grid>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="section">
                            <Grid>
                                <Cell width={12/12} center>
                                    <h4>Contacteer Ons</h4>
                                    <p className="left-align light">
                                        Shout is momenteel nog in volle ontwikkeling, als je toffe ideeën of bevindingen hebt, kan je altijd een mailtje sturen of gewoon even bij ons op de deur komen kloppen:
                                        <ul>
                                            <li>Yigit Abbas</li>
                                            <li>Robin Malfait</li>
                                            <li>Mike Brants</li>
                                        </ul>
                                    </p>
                                </Cell>
                            </Grid>
                        </div>
                    </div>

                    <Gmaps ref='Gmaps' width={'100%'} height={map.height} lat={coords.lat} lng={coords.lng} zoom={17}>
                        <Marker lat={coords.lat} lng={coords.lng} />
                    </Gmaps>
                </div>
            </div>
        )
    }
})

export default _IndexLoggedOut
