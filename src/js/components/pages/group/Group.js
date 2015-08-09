import React from 'react/addons'

import cx from "classnames"
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
            formIsOpen: false,
            logoHover: false
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
    },
    componentWillUnmount() {
        GroupStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
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
            formIsOpen: true
        })
    },
    hoverLogo() {
        this.setState({
            logoHover: ! this.state.logoHover
        })
    },
    onLogoEdited() {
        this.setState({
            formIsOpen: false
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
        let { group, leavingOrJoiningGroupLoading, formIsOpen, logoHover } = this.state
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
                {isAdmin && formIsOpen && <EditLogo isOpen={formIsOpen} onDone={this.onLogoEdited} image={group.logo_path} groupId={group.id}/>}
                <Grid>
                    <Cell center>
                        <Parallax img='/dist/img/banner.jpg' height={300} relative>
                            <button style={{
                                position: 'absolute',
                                right: 10,
                                bottom: 10
                            }} className="btn" onClick={() => {inGroup ? this.leaveGroup() : this.joinGroup()}}>
                                {leavingOrJoiningGroupLoading && <Icon className="right" icon="loop" spinning/>}
                                {group.meta_information.in_group ? 'Groep Verlaten' : 'Lid Worden'}
                            </button>
                        </Parallax>
                    </Cell>
                    <Cell>
                        <Card style={{marginTop: 0, marginBottom: 0}} className="no-shadow">
                            <CardContent>
                                <Grid style={{marginBottom: 0}}>
                                    <Cell width={6/12}>
                                        <div className={logoClass} onClick={this.editLogo} onMouseLeave={this.hoverLogo} onMouseEnter={this.hoverLogo}>
                                            <img src={group.logo_path}/>
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
