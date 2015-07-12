import React from 'react'
import Icon from './Icon'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import UserActions from '../../actions/UserActions'
import SearchActions from '../search/SearchActions'
import { Link } from 'react-router'

var LoggedInHeader = React.createClass({
    logout(event) {
        event.preventDefault()
        UserActions.logout()
    },
    toggleSearch(event) {
        event.preventDefault()
        SearchActions.toggleSearch()
    },
    render() {
        return (
            <ul className="right hide-on-med-and-down">
                <li>
                    <a href onClick={this.toggleSearch}>
                        <Icon icon="search" />
                    </a>
                </li>
                <li>
                    <Dropdown>
                        <DropdownTitle>
                            <Icon icon="view_module" />
                        </DropdownTitle>
                        <DropdownContent>
                            <ul>
                                <li><a href="#!">VTK</a></li>
                                <li><a href="#!" className="collection-item"> VRG <span className="new badge">4</span></a></li>
                                <li><a href="#!">Home Fabiola</a></li>
                                <li className="divider"></li>
                                <li><a href="#!">Alle groepen</a></li>
                            </ul>
                        </DropdownContent>
                    </Dropdown>
                </li>
                <li>
                    <Link to="home">
                        <Icon icon="chat_bubble_outline" />
                    </Link>
                </li>
                <li>
                    <Dropdown>
                        <DropdownTitle>
                            <Icon icon="schedule" />
                        </DropdownTitle>
                        <DropdownContent>
                            <ul>
                                <li><a href="#!">Log 1</a></li>
                                <li><a href="#!">Log 2</a></li>
                                <li><a href="#!">Log 3</a></li>
                                <li><a href="#!">Log 4</a></li>
                                <li className="divider"></li>
                                <li><a href="#!">Alle logs weergeven</a></li>
                            </ul>
                        </DropdownContent>
                    </Dropdown>
                </li>
                <li>
                    <Dropdown>
                        <DropdownTitle>
                            <i className="material-icons right">perm_identity</i> {this.props.user.name}
                        </DropdownTitle>
                        <DropdownContent>
                            <ul>
                                <li>
                                    <Link to="settings">
                                        Profile
                                    </Link>
                                </li>
                                <li className="divider"></li>
                                <li><a href="#!">Nieuwe shout</a></li>
                                <li><a href="#!">Nieuwe groep</a></li>

                                <li className="divider"></li>
                                <li><a href onClick={this.logout}>Log out</a></li>
                            </ul>
                        </DropdownContent>
                    </Dropdown>
                </li>
            </ul>
        )
    }
})

export default LoggedInHeader
