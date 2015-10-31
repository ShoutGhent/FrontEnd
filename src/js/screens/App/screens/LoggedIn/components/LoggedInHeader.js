import React from 'react'

import assign from 'react/lib/Object.assign'
import AddGroup from './AddGroup'
import Auth from 'AuthService'
import Avatar from 'components/Avatar'
import Emojify from 'Emojify'
import Icon from 'Icon'
import Log from 'Log'
import LogStore from 'LogStore'
import Router from 'RouterContainer'
import SearchActions from 'SearchActions'
import { Dropdown, DropdownTitle, DropdownContent } from 'Dropdown'
import { Link } from 'react-router'

let LoggedInHeader = React.createClass({
    propTypes: {
        className: React.PropTypes.string.isRequired,
    },
    getInitialState() {
        return assign(LogStore.getState(), {
            isAddGroupFormOpen: false
        })
    },
    componentDidMount() {
        LogStore.listen(this._onChange)
    },
    componentWillUnmount() {
        LogStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
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
    calculateUnseenNotificationsCount()
    {
        var x = 0

        this.state.notifications.forEach(n => {
            if ( ! n.seen) {
                x++
            }
        })

        return x
    },
    render() {
        let { user, className } = this.props
        let { isAddGroupFormOpen } = this.state
        let notificationCount = this.calculateUnseenNotificationsCount()

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
                <li>
                    <Link to="map">
                        <Icon icon="public" />
                    </Link>
                </li>
                <li className="hidden">
                    <Link to="home">
                        <Icon icon="chat_bubble_outline" />
                    </Link>
                </li>
                <li>
                    <Dropdown>
                        <DropdownTitle>
                        {notificationCount > 0 ? (
                            <div className="badge__count">
                                <Icon icon="schedule" />
                                <span>{notificationCount}</span>
                            </div>
                        ) : (
                            <Icon icon="schedule" />
                        )}
                        </DropdownTitle>
                        <DropdownContent>
                            <li>
                                <Log />
                            </li>
                            <li className="divider"></li>
                            <li style={{textAlign:'center'}}><Link to="notifications">Alle logs weergeven</Link></li>
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
