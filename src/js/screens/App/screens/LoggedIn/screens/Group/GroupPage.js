import React from 'react/addons'

import assign from 'react/lib/Object.assign'
import Cloudinary from 'Cloudinary'
import cx from "classnames"
import EditGroupLocation from './components/EditGroupLocation'
import EditGroupName from './components/EditGroupName'
import EditHeader from './components/EditHeader'
import EditLogo from './components/EditLogo'
import Emojify from 'Emojify'
import GroupActions from 'GroupActions'
import GroupDistance from 'GroupDistance'
import GroupStore from 'GroupStore'
import Icon from 'Icon'
import Loading from 'Loading'
import Redirect from 'Redirect'
import RemoveGroup from './components/RemoveGroup'
import ShoutFeed from 'ShoutFeed'
import { Button } from 'forms/material/Material'
import { Card, CardContent, CardTitle } from 'Card'
import { Grid, Cell } from 'Grid'
import { Tab, TabPanel } from 'Tab'

let GroupPage = React.createClass({
    statics: {
        willTransitionTo(transition, params, query) {
            GroupActions.fetchGroupInformation(params.groupId)
        }
    },
    getInitialState() {
        return assign(GroupStore.getState(), {
            editHeaderFormOpen: false,
            editLogoFormOpen: false,
            headerWidth: 800,
            logoHover: false
        })
    },
    componentDidMount() {
        GroupStore.listen(this._onChange)

        window.addEventListener('resize', this.calcHeaderWidth)

        this.calcHeaderWidth()
    },
    componentWillUnmount() {
        GroupStore.unlisten(this._onChange)
        window.removeEventListener('resize', this.calcHeaderWidth)
    },
    _onChange(state) {
        this.setState(state)
    },
    calcHeaderWidth(force) {
        if ( ! this.refs.header) {
            setTimeout(() => {
                this.calcHeaderWidth(true)
            }, 200)
            return
        }

        let width = React.findDOMNode(this.refs.header).offsetWidth

        if (Math.abs(width - this.state.headerWidth) > 30) {
            this.setState({ headerWidth: width })
        }

        if(force) {
            this.setState({ headerWidth: width })
        }
    },
    changeTab(tabId) {
        Redirect.replaceWith('group', {
            tabId,
            groupId: this.props.params.groupId
        })
    },
    leaveGroup() {
        GroupActions.leaveGroup(this.state.group.id)
    },
    joinGroup() {
        GroupActions.joinGroup(this.state.group.id)
    },
    editLogo() {
        this.setState({ editLogoFormOpen: true })
    },
    editHeader() {
        this.setState({ editHeaderFormOpen: true })
    },
    updateGroup(data) {
        let { group } = this.state

        group = assign({}, group, data)

        this.setState({ group })
    },
    hoverLogo() {
        this.setState({ logoHover: ! this.state.logoHover })
    },
    onLogoEdited() {
        this.setState({ editLogoFormOpen: false })
    },
    onHeaderEdited() {
        this.setState({ editHeaderFormOpen: false })
    },
    removeGroup() {
        Redirect.to('home')
    },
    render() {
        let { loading } = this.state

        return (
            <div className="container">
            {loading ? (
                <Loading />
            ) : this.renderGroup()}
            </div>
        )
    },
    renderGroup() {
        let { group, leavingOrJoiningGroupLoading, editLogoFormOpen, editHeaderFormOpen, logoHover, headerWidth } = this.state
        let { params } = this.props
        let memberCount = group.meta.member_count
        let inGroup = group.meta.in_group
        let isAdmin = group.meta.my_type == "admin"

        let logoClass = cx({
            "group__logo": true,
            "group__logo--change": isAdmin && logoHover
        })

        return (
            <div className="group">
                {isAdmin && editLogoFormOpen && (
                    <EditLogo
                        groupId={group.id}
                        image={group.header_data.secure_url}
                        isOpen={editLogoFormOpen}
                        onDone={this.onLogoEdited}
                    />
                )}
                {isAdmin && editHeaderFormOpen && (
                    <EditHeader
                        groupId={group.id}
                        image={group.header_data.secure_url}
                        isOpen={editHeaderFormOpen}
                        onDone={this.onHeaderEdited}
                    />
                )}
                <Grid>
                    <Cell center>
                        <div className="group__header" ref="header">
                            <Cloudinary
                                fallbackHeight={Math.round(headerWidth / (21/9))}
                                image={group.header_data}
                                options={{width: headerWidth}}
                                style={{position:'relative'}}
                                defaultElement={<h1 className="center-both" style={{
                                    color: 'rgba(0, 0, 0, 0.4)',
                                    margin: 0
                                }}><Emojify>{group.name}</Emojify></h1>}
                            />
                            <div className="group__header__buttons">
                                {isAdmin && (
                                    <Button onClick={this.editHeader}>
                                        Wijzig Afbeelding
                                    </Button>
                                )}
                                <Button
                                    disabled={(inGroup && memberCount == 1) || isAdmin}
                                    onClick={() => {inGroup ? this.leaveGroup() : this.joinGroup()}}
                                >
                                    {leavingOrJoiningGroupLoading && (
                                        <Icon className="right" icon="loop" spinning/>
                                    )}

                                    {group.meta.in_group ? (
                                        <span>Groep Verlaten</span>
                                    ) : (
                                        <span>Lid Worden</span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Cell>
                    <Cell>
                        <Card style={{marginTop: 0, marginBottom: 0}} className="no-shadow group__information">
                            <CardContent>
                                <Grid style={{marginBottom: 0}}>
                                    <Cell width={6/12}>
                                        <div className={logoClass} onClick={this.editLogo} onMouseLeave={this.hoverLogo} onMouseEnter={this.hoverLogo}>
                                            <Cloudinary
                                                image={group.logo_data}
                                                options={{ width: 100, height: 100, crop: 'fill' }}
                                                defaultElement={<h1 className="center-both" style={{
                                                    color: 'rgba(0, 0, 0, 0.4)',
                                                    fontWeight: 'bold',
                                                    margin: 0
                                                }}>{group.name.substr(0, 1).toUpperCase()}</h1>}
                                            />
                                        </div>

                                        <h4 className="left" style={{marginLeft: 20}}>
                                            <Emojify>{group.name}</Emojify>
                                        </h4>
                                    </Cell>
                                    <Cell width={6/12}>
                                        <div className="right">
                                            <GroupDistance group={group} badge/>
                                            <span className="group-badge">
                                                {memberCount} {memberCount == 1 ? 'lid' : 'leden'}
                                            </span>
                                        </div>
                                    </Cell>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Cell>
                    <Cell>
                        <Tab className="white" marginTop={0} activeTab={params.tabId} onTabChange={this.changeTab}>
                            <TabPanel title="Shouts" tabId="shouts">
                                <Grid>
                                    <Cell width={9/12}>
                                        <ShoutFeed
                                            canShout={inGroup}
                                            groupId={group.id}
                                            url={`shouts/group/${group.id}`}
                                        />
                                    </Cell>
                                </Grid>
                            </TabPanel>
                            {isAdmin && (
                                <TabPanel title="Beheer" tabId="manage">
                                    <Grid>
                                        <Cell width={6/12}>
                                            <EditGroupName
                                                group={group}
                                                onChange={this.updateGroup}
                                            />
                                            <RemoveGroup
                                                group={group}
                                                onDelete={this.removeGroup}
                                            />
                                        </Cell>
                                        <Cell width={6/12}>
                                            <EditGroupLocation
                                                group={group}
                                                onChange={this.updateGroup}
                                            />
                                        </Cell>
                                    </Grid>
                                </TabPanel>
                            )}
                        </Tab>
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default GroupPage
