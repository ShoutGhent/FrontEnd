import React from 'react'

import AddGroup from '../pages/group/AddGroup'
import Auth from '../../auth/AuthService'
import Avatar from '../users/Avatar'
import Emojify from '../partials/Emojify'
import Icon from '../partials/Icon'
import SearchActions from '../search/SearchActions'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import { Link } from 'react-router'

let LoggedInHeader = React.createClass({
    propTypes: {
        className: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            isAddGroupFormOpen: false
        }
    },
    logout(event) {
        event.preventDefault()
        Auth.logout()
    },
    toggleSearch(event) {
        event.preventDefault()
        SearchActions.openSearch()
    },
    openAddGroupForm(event) {
        event.preventDefault()

        this.setState({
            isAddGroupFormOpen: true
        })
    },
    groupWasAdded() {
        this.setState({
            isAddGroupFormOpen: false
        })
    },
    closeAddGroupModal() {
        this.setState({
            isAddGroupFormOpen: false
        })
    },
    render() {
        let { user, className } = this.props
        let { isAddGroupFormOpen } = this.state

        return (
            <ul className={className}>
                <li className="hide-on-med-and-down">
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
                            <Emojify>{user.full_name}</Emojify> <Avatar email={user.email} size={30} round/>
                        </DropdownTitle>
                        <DropdownContent>
                            <li><Link to="profile">Profiel</Link></li>
                            <li><Link to="settings" params={{tabId: 'general'}}>Instellingen</Link></li>
                            <li className="divider"></li>
                            <li><a href onClick={this.openAddGroupForm}>Nieuwe groep</a></li>

                            <li className="divider"></li>
                            <li><a href onClick={this.logout}>Uitloggen</a></li>
                        </DropdownContent>
                    </Dropdown>
                    <AddGroup
                        isOpen={isAddGroupFormOpen}
                        onClose={this.closeAddGroupModal}
                        onDone={this.groupWasAdded}
                    />
                </li>
            </ul>
        )
    }
})

export default LoggedInHeader
