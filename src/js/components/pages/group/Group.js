import React from 'react/addons'

import assign from 'react/lib/Object.assign'
import Cloudinary from '../../partials/Cloudinary'
import cx from "classnames"
import EditGroupLocation from './EditGroupLocation'
import EditGroupName from './EditGroupName'
import EditHeader from './EditHeader'
import EditLogo from './EditLogo'
import GroupActions from './GroupActions'
import GroupStore from './GroupStore'
import Icon from '../../partials/Icon'
import Loading from '../../loading/Loading'
import Parallax from '../../partials/Parallax'
import Redirect from '../../../services/Redirect'
import RemoveGroup from './RemoveGroup'
import ShoutFeed from '../../shout/ShoutFeed'
import ShoutForm from '../../shout/ShoutForm'
import { Button } from '../../button/MaterialButton'
import { Card, CardContent, CardTitle } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'
import { Tab, TabPanel } from '../../tab/Tab'

let Group = React.createClass({
    statics: {
        willTransitionTo(transition, params, query) {
            GroupActions.fetchGroupInformation(params.groupId)
        }
    },
    getInitialState() {
        return assign(GroupStore.getState(), {
            editLogoFormOpen: false,
            editHeaderFormOpen: false,
            logoHover: false,
            headerWidth: 800
        })
    },
    componentDidMount() {
        GroupStore.listen(this._onChange)

        window.addEventListener('resize', (event) => {
            this.calcHeaderWidth()
        })

        this.calcHeaderWidth()
    },
    componentWillUnmount() {
        GroupStore.unlisten(this._onChange)
        window.removeEventListener('resize')
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

        if (Math.abs(width - this.state.headerWidth) > 30)
        {
            this.setState({
                headerWidth: width
            })
        }

        if(force) {
            this.setState({
                headerWidth: width
            })
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
        this.setState({
            editLogoFormOpen: true
        })
    },
    editHeader() {
        this.setState({
            editHeaderFormOpen: true
        })
    },
    updateGroup(group) {
        this.setState({ group })
    },
    hoverLogo() {
        this.setState({
            logoHover: ! this.state.logoHover
        })
    },
    onLogoEdited() {
        this.setState({
            editLogoFormOpen: false
        })
    },
    onHeaderEdited() {
        this.setState({
            editHeaderFormOpen: false
        })
    },
    removeGroup() {
        Redirect.to('home')
    },
    render() {
        let { loading, group } = this.state

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
                {isAdmin && editLogoFormOpen && <EditLogo isOpen={editLogoFormOpen} onDone={this.onLogoEdited} image={group.header_data.url} groupId={group.id}/>}
                {isAdmin && editHeaderFormOpen && <EditHeader isOpen={editHeaderFormOpen} onDone={this.onHeaderEdited} image={group.header_data.url} groupId={group.id}/>}
                <Grid>
                    <Cell center>
                        <div className="group__header" ref="header">
                            <Cloudinary
                                fallbackHeight={Math.round(headerWidth / (21/9))}
                                style={{position:'relative'}}
                                image={group.header_data}
                                options={{width: headerWidth}}
                                defaultElement={<h1 style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'rgba(0, 0, 0, 0.4)',
                                    margin: 0
                                }}>{group.name}</h1>}
                            />
                            <div className="group__header__buttons">
                                {isAdmin &&
                                    <Button onClick={this.editHeader}>
                                        Wijzig Afbeelding
                                    </Button>
                                }
                                <Button
                                    disabled={(inGroup && memberCount == 1) || isAdmin}
                                    onClick={() => {inGroup ? this.leaveGroup() : this.joinGroup()}}
                                >
                                    {leavingOrJoiningGroupLoading && <Icon className="right" icon="loop" spinning/>}
                                    {group.meta.in_group ? 'Groep Verlaten' : 'Lid Worden'}
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
                                                defaultElement={<h1 style={{
                                                    position: 'absolute',
                                                    left: '50%',
                                                    top: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    color: 'rgba(0, 0, 0, 0.4)',
                                                    fontWeight: 'bold',
                                                    margin: 0
                                                }}>{group.name.substr(0, 1).toUpperCase()}</h1>}
                                            />
                                        </div>

                                        <h4 className="left" style={{marginLeft: 20}}>{group.name}</h4>
                                    </Cell>
                                    <Cell width={6/12}>
                                        <span className="right">
                                            {memberCount} {memberCount == 1 ? 'lid' : 'leden'}
                                        </span>
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
                                        <ShoutFeed canShout={inGroup} groupId={group.id} url={`shouts/group/${group.id}`}/>
                                    </Cell>
                                </Grid>
                            </TabPanel>
                            {isAdmin &&
                            <TabPanel title="Beheer" tabId="manage">
                                <Grid>
                                    <Cell width={6/12}>
                                        <EditGroupName group={group} onChange={this.updateGroup}/>
                                        <RemoveGroup group={group} onDelete={this.removeGroup}/>
                                    </Cell>
                                    <Cell width={6/12}>
                                        <EditGroupLocation group={group} onChange={this.updateGroup}/>
                                    </Cell>
                                </Grid>
                            </TabPanel>
                            }
                        </Tab>
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default Group
