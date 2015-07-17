import React from 'react'
import Parallax from '../../partials/Parallax'
import Headline from '../../partials/Headline'
import Icon from '../../partials/Icon'
import { Grid, Cell } from '../../grid/Grid'
import { Gmaps, Marker } from 'react-gmaps'

const coords = {
    lat: 51.0393565,
    lng: 3.7271276
}

var _IndexLoggedOut = React.createClass({
    render() {
        return (
            <div>
                <Parallax img='/img/background1.jpg'>
                    <div id="index-banner">
                        <div className="section">
                            <div className="container">
                                <h1 className="header center white-text text-lighten-2">Schreeuw het van de daken!</h1>
                                <Grid>
                                    <Cell width={12/12} center>
                                        <h5 className="header light white-text">Shout! verenigt studenten en maakt van hen een hechte groep. Registreer je nu en ontdek de voordelen.</h5>
                                    </Cell>
                                    <Cell width={12/12} center>
                                        <a href="register" className="btn btn-large waves-effect waves-light">Registeren</a>
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
                                <Cell width={4/12}>
                                    <div className="icon-block">
                                        <h2 className="center brown-text"><Icon icon="flash_on" /></h2>
                                        <h5 className="center">Speeds up development</h5>

                                        <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                                    </div>
                                </Cell>
                                <Cell width={4/12}>
                                    <div className="icon-block">
                                        <h2 className="center brown-text"><Icon icon="group" /></h2>
                                        <h5 className="center">User Experience Focused</h5>

                                        <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                                    </div>
                                </Cell>
                                <Cell width={4/12}>
                                    <div className="icon-block">
                                        <h2 className="center brown-text"><Icon icon="settings" /></h2>
                                        <h5 className="center">Easy to work with</h5>

                                        <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                                    </div>
                                </Cell>
                            </Grid>
                        </div>
                    </div>
                </div>


                <Parallax img='/img/background2.jpg'>
                    <Headline>A modern responsive front-end framework based on Material Design</Headline>
                </Parallax>

                <div className="container">
                    <div className="section">
                        <Grid>
                            <Cell width={12/12}>
                                <h3><Icon icon="send" /></h3>
                                <h4>Contact Us</h4>
                                <p className="left-align light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
                            </Cell>
                        </Grid>
                    </div>
                </div>

                <Parallax img='/img/background3.jpg'>
                    <Headline>A modern responsive front-end framework based on Material Design</Headline>
                </Parallax>

                <div>
                    <Gmaps
                        ref='Gmaps'
                        width={'100%'}
                        height={'400px'}
                        lat={coords.lat}
                        lng={coords.lng}
                        zoom={17}>
                        <Marker
                            lat={coords.lat}
                            lng={coords.lng} />
                    </Gmaps>
                </div>
            </div>
        )
    }
})

export default _IndexLoggedOut
