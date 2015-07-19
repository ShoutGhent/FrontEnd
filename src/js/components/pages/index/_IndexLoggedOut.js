import React from 'react'
import { Link } from 'react-router'
import Parallax from '../../partials/Parallax'
import Headline from '../../partials/Headline'
import Icon from '../../partials/Icon'
import { Grid, Cell } from '../../grid/Grid'
import { Gmaps, Marker } from 'react-gmaps'
import Register from '../../users/Register'

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
                    <Parallax img='/dist/img/background1.jpg'>
                        <div id="index-banner">
                            <div className="section">
                                <div className="container">
                                    <h1 className="header center white-text text-lighten-2">Schreeuw het van de daken!</h1>
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
                                    <Cell width={6/12} center>
                                        <h4>Subtekst Titel</h4>
                                        <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                                    </Cell>
                                    <Cell width={6/12} center>
                                        <h4>Subtekst Titel</h4>
                                        <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
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
                                    <p className="left-align light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
                                </Cell>
                            </Grid>
                        </div>
                    </div>

                    <Parallax img='/dist/img/background3.jpg'>
                        <Headline>A modern responsive front-end framework based on Material Design</Headline>
                    </Parallax>

                    <Gmaps ref='Gmaps' width={'100%'} height={map.height} lat={coords.lat} lng={coords.lng} zoom={17}>
                        <Marker lat={coords.lat} lng={coords.lng} />
                    </Gmaps>
                </div>
            </div>
        )
    }
})

export default _IndexLoggedOut
