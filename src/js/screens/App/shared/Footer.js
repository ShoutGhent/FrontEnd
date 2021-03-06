import React from 'react'

import { Grid, Cell } from 'Grid'

let Footer = React.createClass({
    render() {
        let marginTop = 0

        if (window.innerHeight > document.documentElement.offsetHeight) {
            marginTop: window.innerHeight - document.documentElement.offsetHeight
        }

        let css = { marginTop }

        return (
            <footer className="page-footer" style={css}>
                <div className="container">
                    <Grid>
                        <Cell width={7/12}>
                            <h5 className="white-text">Shout!</h5>
                            <p className="grey-text text-lighten-4">
                                We are a team of college students working on this project like it's our full time job.
                                Any amount would help support and continue development on this project and is greatly appreciated.
                            </p>
                        </Cell>
                        <Cell width={5/12}>
                            <h5 className="white-text">Contact</h5>
                            <ul>
                                <li><a className="white-text" href="#!">Link 1</a></li>
                                <li><a className="white-text" href="#!">Link 2</a></li>
                                <li><a className="white-text" href="#!">Link 3</a></li>
                                <li><a className="white-text" href="#!">Link 4</a></li>
                            </ul>
                        </Cell>
                    </Grid>
                </div>
                <div className="footer-copyright">
                    <div className="container center-align">
                        Made with &hearts; by <a className="white-text" href="http://shout.nu">Shout!</a>
                    </div>
                </div>
            </footer>
        )
    }
})

export default Footer
