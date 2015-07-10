import React from 'react'
import Logo from './Logo'

var Header = React.createClass({
    render() {
        return (
            <div>
                <ul id="dropdown_profile" className="dropdown-content">
                    <li><a href="/settings">Profiel</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">Nieuwe shout</a></li>
                    <li><a href="#!">Nieuwe groep</a></li>

                    <li className="divider"></li>
                    <li><a href="#!">Log out</a></li>
                </ul>

                <ul id="dropdown_logs" className="dropdown-content">
                    <li><a href="#!">Log 1</a></li>
                    <li><a href="#!">Log 2</a></li>
                    <li><a href="#!">Log 3</a></li>
                    <li><a href="#!">Log 4</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">Alle logs weergeven</a></li>
                </ul>

                <ul id="dropdown_groups" className="dropdown-content">
                    <li><a href="#!">VTK</a></li>
                    <li><a href="#!" className="collection-item"> VRG <span className="new badge">4</span></a></li>
                    <li><a href="#!">Home Fabiola</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">Alle groepen</a></li>
                </ul>

                <nav className="teal" role="navigation">
                    <div className="nav-wrapper container">
                        <Logo />
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <a href="#" data-toggle="#search">
                                    <i className="material-icons">search</i>
                                </a>
                            </li>
                            <li id="search" data-focus=".navbar-input">
                                <form action="">
                                    <input type="text" className="navbar-input"/>
                                </form>
                            </li>
                            <li>
                                <a href="/start" className="dropdown-button" data-activates="dropdown_groups">
                                    <i className="material-icons">view_module</i>
                                </a>
                            </li>
                            <li>
                                <a href="/start">
                                    <i className="material-icons">chat_bubble_outline</i>
                                </a>
                            </li>
                            <li>
                                <a href="/logs" className="dropdown-button" data-activates="dropdown_logs">
                                    <i className="material-icons">schedule</i>
                                </a>
                            </li>
                            <li><a href="#!" className="dropdown-button" data-activates="dropdown_profile"><i className="material-icons right">perm_identity</i> Mike Brants </a></li>
                        </ul>

                        <ul id="nav-mobile" className="side-nav">
                            <li className="row">
                                <form>
                                    <input type="text" placeholder="search" className="col s12" />
                                </form>
                            </li>
                            <li><a href="/">Start</a></li>
                            <li><a href="/login">Log in</a></li>
                            <li><a href="/register">Registreren</a></li>
                        </ul>
                        <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
            </div>
        )
    }
});

export default Header
