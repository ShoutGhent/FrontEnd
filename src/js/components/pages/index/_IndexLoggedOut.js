import React from 'react'

import Avatar from '../../users/Avatar'
import Footer from '../../partials/Footer'
import Headline from '../../partials/Headline'
import Icon from '../../partials/Icon'
import Maps from '../../maps/Maps'
import Parallax from '../../partials/Parallax'
import { Card, CardContent, CardTitle, CardFooter } from '../../card/Card'
import { Gmaps, Marker } from 'react-gmaps'
import { Grid, Cell } from '../../grid/Grid'
import { Link } from 'react-router'

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
                    <Parallax img='/dist/img/banner.jpg'>
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
                                            <h5 className="header light white-text">Voor en door studenten</h5>
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
                            <Grid>
                                <Cell width={4/12}>
                                    <Card>
                                        <CardContent>
                                            <CardTitle center>Wat?</CardTitle>
                                            <p className="justify-content">
                                                Shout is een sociale netwerksite gemaakt door en voor studenten,
                                                meer bepaald voor de hogeschool en universiteitsstudenten in Gent.
                                                Met Shout willen we een speciale plaats op het net creëren,
                                                waar de studenten hun ervaringen kunnen delen met hun medestudenten.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Cell>
                                <Cell width={4/12}>
                                    <Card>
                                        <CardContent>
                                            <CardTitle center>Hoe?</CardTitle>
                                            <p className="justify-content">
                                                Omdat het onder de studenten blijft, kan je een stuk losser en zotter zijn.
                                                Je kan je shouts zowel anoniem als tijdelijk plaatsen.
                                                Zo kan je bijvoorbeeld wijze foto’s van een nachtje Overpoort gemakkelijk en zorgeloos kwijt op Shout!
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Cell>
                                <Cell width={4/12}>
                                    <Card>
                                        <CardContent>
                                            <CardTitle center>Waarom?</CardTitle>
                                            <p className="justify-content">
                                                Daarnaast is Shout zo ontworpen, dat je nieuwigheden en activiteiten van allerlei studentenkringen gemakkelijker te horen krijgt.
                                                Door lid te worden van Shout steun je indirect de studentenverenigingen met het verwerven van sponsors, waardoor wij,
                                                de studenten, onder andere meer toffe activiteiten kunnen organiseren!
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Cell>
                            </Grid>
                        </div>
                    </div>

                    <div className="container">
                        <div className="section">
                            <Grid>
                                <Cell width={12/12}>
                                    <Card>
                                        <CardContent>
                                            <CardTitle>Contact</CardTitle>
                                            <blockquote>
                                                <p>
                                                    Shout is momenteel nog in volle ontwikkeling, er is nog geen mobiele app maar we doen ons best om het zo snel mogelijk gebruiksklaar te krijgen.
                                                </p>
                                                <p>
                                                    Als je toffe ideeën of bevindingen hebt, kan je altijd een mailtje sturen of ons komen zoeken in de homes:
                                                </p>
                                            </blockquote>

                                            <Grid>
                                                <Cell width={4/12} center>
                                                    <Card>
                                                        <CardContent>
                                                            <CardTitle>Yigit Abbas</CardTitle>
                                                            <Avatar email="yigit_geniemaster@telenet.be" size={100} round/>
                                                            <p>Home Fabiola</p>
                                                        </CardContent>
                                                        <CardFooter>
                                                            <a href="mailto:yigit.abbas@ugent.be">Mail Me</a>
                                                        </CardFooter>
                                                    </Card>
                                                </Cell>
                                                <Cell width={4/12} center>
                                                    <Card>
                                                        <CardContent>
                                                            <CardTitle>Robin Malfait</CardTitle>
                                                            <Avatar email="malfait.robin@gmail.com" size={100} round/>
                                                            <p>Home Heymans</p>
                                                        </CardContent>
                                                        <CardFooter>
                                                            <a href="mailto:robin.malfait.v3534@student.hogent.be">Mail Me</a>
                                                        </CardFooter>
                                                    </Card>
                                                </Cell>
                                                <Cell width={4/12} center>
                                                    <Card>
                                                        <CardContent>
                                                            <CardTitle>Mike Brants</CardTitle>
                                                            <Avatar email="mike.brants@gmail.com" size={100} round/>
                                                            <p>Home Fabiola</p>
                                                        </CardContent>
                                                        <CardFooter>
                                                            <a href="mailto:mike.brants@ugent.be">Mail Me</a>
                                                        </CardFooter>
                                                    </Card>
                                                </Cell>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Cell>
                            </Grid>
                        </div>
                    </div>

                    <Maps width={'100%'} height={map.height}>
                        <Gmaps ref='Gmaps' width={'100%'} height={map.height} lat={coords.lat} lng={coords.lng} zoom={17}>
                            <Marker lat={coords.lat} lng={coords.lng} />
                        </Gmaps>
                    </Maps>
                </div>
                <Footer />
            </div>
        )
    }
})

export default _IndexLoggedOut
