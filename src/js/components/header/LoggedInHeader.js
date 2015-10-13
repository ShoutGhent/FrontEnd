import React from 'react'

import AddGroup from '../pages/group/AddGroup'
import Auth from '../../auth/AuthService'
import Avatar from '../users/Avatar'
import Emojify from '../partials/Emojify'
import Icon from '../partials/Icon'
import Log from '../../components/log/Log'
import LogStore from '../../components/log/LogStore'
import Redirect from '../../services/Redirect'
import Router from '../../services/RouterContainer'
import SearchActions from '../search/SearchActions'
import { Dropdown, DropdownTitle, DropdownContent } from '../dropdown/Dropdown'
import { Link } from 'react-router'

let LoggedInHeader = React.createClass({
    propTypes: {
        className: React.PropTypes.string.isRequired,
        closeNavigation: React.PropTypes.func.isRequired,
    },
    getInitialState() {
        let state = LogStore.getState()

        state.isAddGroupFormOpen = false

        return state
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
    goToMap(e) {
        Redirect.to(e.target.checked ? 'map' : 'home')
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
                    <div className="switch">
                        <label>
                            <input type="checkbox" checked={Router.pathNameIs("map")} onChange={this.goToMap}/>
                            <span className="lever"></span>
                        </label>
                    </div>
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
                            <li onClick={this.props.closeNavigation}><Link to="profile">Profiel</Link></li>
                            <li onClick={this.props.closeNavigation}><Link to="settings" params={{tabId: 'general'}}>Instellingen</Link></li>
                            <li className="divider"></li>
                            <li onClick={this.props.closeNavigation}><a href onClick={this.openAddGroupForm}>Nieuwe groep</a></li>

                            <li className="divider"></li>
                            <li onClick={this.props.closeNavigation}><a href onClick={this.logout}>Uitloggen</a></li>
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
