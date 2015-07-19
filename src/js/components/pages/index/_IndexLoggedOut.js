import React from 'react'
import { Link } from 'react-router'
import Parallax from '../../partials/Parallax'
import Headline from '../../partials/Headline'
import Icon from '../../partials/Icon'
import { Grid, Cell } from '../../grid/Grid'
import { Gmaps, Marker } from 'react-gmaps'
import Register from '../../users/Register'
import Login from '../../users/Login'

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
                <Parallax img='/dist/img/background1.jpg'>
                    <div id="index-banner">
                        <div className="section">
                            <div className="container">
                                <h1 className="header center white-text">Schreeuw het van de daken!</h1>
                                <Grid>
                                    <Cell center>
                                        <h5 className="header light white-text">Shout! verenigt studenten en maakt van hen een hechte groep. Registreer je nu en ontdek de voordelen.</h5>
                                    </Cell>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Parallax>

                <div className="container">
                    <div className="section">
                        <div className="row">
                            <Grid>
                                <Cell width={6/12}>
                                    <div className="icon-block">
                                        <h2 className="center brown-text"><Icon icon="flash_on" /></h2>
                                        <h5 className="center">Subtekst</h5>

                                        <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                                    </div>
                                </Cell>
                                <Cell width={6/12}>
                                    <Register/>
                                </Cell>
                            </Grid>
                        </div>
                    </div>
                </div>

                <Parallax img='/dist/img/background2.jpg'>
                    <Headline>A modern responsive front-end framework based on Material Design</Headline>
                </Parallax>

                <div className="container">
                    <div className="section">
                        <Grid>
                            <Cell width={12/12} center>
                                <h3><Icon icon="send" /></h3>
                                <h4>Contact Us</h4>
                                <p className="left-align light">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur excepturi non nostrum porro quae quisquam sed similique velit? Beatae consectetur cum nobis, non odit quidem soluta suscipit tempore. Facilis!
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet at beatae commodi corporis cupiditate dicta, eligendi est ex excepturi expedita harum hic impedit in ipsum labore nam, sapiente veniam.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet architecto culpa delectus, deserunt doloremque, excepturi illum impedit incidunt itaque laudantium nemo neque quae quia quis rerum veniam vero voluptas voluptatem!
                                </p>
                            </Cell>
                        </Grid>
                    </div>
                </div>

                <Parallax img='/dist/img/background3.jpg'>
                    <Headline>A modern responsive front-end framework based on Material Design</Headline>
                </Parallax>

                <div>
                    <Gmaps ref='Gmaps' width={'100%'} height={map.height} lat={coords.lat} lng={coords.lng} zoom={17}>
                        <Marker lat={coords.lat} lng={coords.lng} />
                    </Gmaps>
                </div>
            </div>
        )
    }
})

export default _IndexLoggedOut
