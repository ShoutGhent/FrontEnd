import React from 'react/addons'

import Cloudinary from '../../partials/Cloudinary'
import cx from "classnames"
import EditHeader from './EditHeader'
import EditLogo from './EditLogo'
import GroupActions from './GroupActions'
import GroupStore from './GroupStore'
import Icon from '../../partials/Icon'
import Loading from '../../loading/Loading'
import Parallax from '../../partials/Parallax'
import Redirect from '../../../services/Redirect'
import ShoutFeed from '../../shout/ShoutFeed'
import ShoutForm from '../../shout/ShoutForm'
import { Card, CardContent, CardTitle } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'
import { Tab, TabPanel } from '../../tab/Tab'

let Group = React.createClass({
    getInitialState() {
        return this.merge(GroupStore.getState(), {
            editLogoFormOpen: false,
            editHeaderFormOpen: false,
            logoHover: false,
            headerWidth: 830
        })
    },
    merge(obj1, obj2) {
        var obj3 = {}
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname] }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname] }
        return obj3
    },
    componentDidMount() {
        GroupStore.listen(this._onChange)

        GroupActions.fetchGroupInformation(this.props.params.groupId)

        window.addEventListener('resize', (event) => {
            this.calcHeaderWidth()
        })
    },
    componentWillUnmount() {
        GroupStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    calcHeaderWidth() {
        let width = React.findDOMNode(this.refs.header).offsetWidth

        if (Math.abs(width - this.state.headerWidth) > 30) {
            this.setState({
                headerWidth: width
            })
        }
    },
    changeTab(tabId) {
        Redirect.to('group', {
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
        let memberCount = group.meta_information.member_count
        let inGroup = group.meta_information.in_group
        let isAdmin = group.meta_information.my_type == "admin"

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
                            />
                            <div className="group__header__buttons">
                                {isAdmin &&
                                    <button
                                        className="btn"
                                        onClick={this.editHeader}
                                    >
                                        Wijzig Afbeelding
                                    </button>
                                }
                                <button
                                    className="btn"
                                    onClick={() => {inGroup ? this.leaveGroup() : this.joinGroup()}}
                                >
                                        {leavingOrJoiningGroupLoading && <Icon className="right" icon="loop" spinning/>}
                                        {group.meta_information.in_group ? 'Groep Verlaten' : 'Lid Worden'}
                                </button>

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
                        </Tab>
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default Group
