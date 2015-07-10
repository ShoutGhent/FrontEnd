import React from 'react'

var Footer = React.createClass({
    render() {
        var css = {
            marginTop: '0'
        };

        return (
            <footer className="page-footer teal" style={css}>
                <div className="container">
                    <div className="row">
                        <div className="col l7 s12">
                            <h5 className="white-text">Shout!</h5>
                            <p className="grey-text text-lighten-4">We are a team of college students working on this project like it's our full time job. Any amount would help support and continue development on this project and is greatly appreciated.</p>
                        </div>
                        <div className="col l5 s12">
                            <h5 className="white-text">Settings</h5>
                            <ul>
                                <li><a className="white-text" href="#!">Link 1</a></li>
                                <li><a className="white-text" href="#!">Link 2</a></li>
                                <li><a className="white-text" href="#!">Link 3</a></li>
                                <li><a className="white-text" href="#!">Link 4</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container center-align">
                        Made with &hearts; by <a className="white-text" href="http://shout.nu">Shout!</a>
                    </div>
                </div>
            </footer>
        )
    }
});

export default Footer
