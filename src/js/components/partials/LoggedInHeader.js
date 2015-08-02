import React from 'react'

import AddGroup from '../pages/group/AddGroup'
import AddShout from '../pages/shout/AddShout'
import Auth from '../../auth/AuthService'
import Avatar from '../users/Avatar'
import Icon from './Icon'
import SearchActions from '../search/SearchActions'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import { Link } from 'react-router'

let LoggedInHeader = React.createClass({
    getInitialState() {
        return {
            isAddShoutFormOpen: false,
            isAddGroupFormOpen: false
        }
    },
    logout(event) {
        event.preventDefault()
        Auth.logout()
    },
    toggleSearch(event) {
        event.preventDefault()
        SearchActions.toggleSearch()
    },
    openAddShoutForm(event) {
        event.preventDefault()

        this.setState({
            isAddShoutFormOpen: true,
            isAddGroupFormOpen: false
        })
    },
    openAddGroupForm(event) {
        event.preventDefault()

        this.setState({
            isAddGroupFormOpen: true,
            isAddShoutFormOpen: false
        })
    },
    shoutWasAdded() {
        this.setState({
            isAddShoutFormOpen: false
        })
    },
    groupWasAdded() {
        this.setState({
            isAddGroupFormOpen: false
        })
    },
    render() {
        let { user } = this.props
        let { isAddShoutFormOpen, isAddGroupFormOpen } = this.state

        return (
            <ul className="right hide-on-med-and-down">
                <li className="hidden">
                    <a href onClick={this.toggleSearch}>
                        <Icon icon="search" />
                    </a>
                </li>
                <li className="hidden">
                    <Dropdown>
                        <DropdownTitle>
                            <Icon icon="view_module" />
                        </DropdownTitle>
                        <DropdownContent>
                            <li><a href="#!">VTK</a></li>
                            <li><a href="#!" className="collection-item"> VRG <span className="new badge">4</span></a></li>
                            <li><a href="#!">Home Fabiola</a></li>
                            <li className="divider"></li>
                            <li><a href="#!">Alle groepen</a></li>
                        </DropdownContent>
                    </Dropdown>
                </li>
                <li className="hidden">
                    <Link to="home">
                        <Icon icon="chat_bubble_outline" />
                    </Link>
                </li>
                <li className="hidden">
                    <Dropdown>
                        <DropdownTitle>
                            <Icon icon="schedule" />
                        </DropdownTitle>
                        <DropdownContent>
                            <li><a href="#!">Log 1</a></li>
                            <li><a href="#!">Log 2</a></li>
                            <li><a href="#!">Log 3</a></li>
                            <li><a href="#!">Log 4</a></li>
                            <li className="divider"></li>
                            <li><a href="#!">Alle logs weergeven</a></li>
                        </DropdownContent>
                    </Dropdown>
                </li>
                <li>
                    <Dropdown>
                        <DropdownTitle>
                            {user.full_name} <Avatar email={user.email} size={30} round/>
                        </DropdownTitle>
                        <DropdownContent>
                            <li><Link to="profile">Profiel</Link></li>
                            <li><Link to="settings">Instellingen</Link></li>
                            <li className="divider"></li>
                            <li><a href onClick={this.openAddShoutForm}>Nieuwe shout</a></li>
                            <li><a href onClick={this.openAddGroupForm}>Nieuwe groep</a></li>

                            <li className="divider"></li>
                            <li><a href onClick={this.logout}>Uitloggen</a></li>
                        </DropdownContent>
                    </Dropdown>
                    <AddShout isOpen={isAddShoutFormOpen} onDone={this.shoutWasAdded}/>
                    <AddGroup isOpen={isAddGroupFormOpen} onDone={this.groupWasAdded}></AddGroup>
                </li>
            </ul>
        )
    }
})

export default LoggedInHeader
