import React from 'react'

import API from '../../../services/API'
import Icon from '../../partials/Icon'
import Loading from '../../loading/Loading'
import Parallax from '../../partials/Parallax'
import RouterContainer from '../../../services/RouterContainer'
import ShoutFeed from '../../shout/ShoutFeed'
import ShoutForm from '../../shout/ShoutForm'
import { Card, CardContent, CardTitle } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'
import { Tab, TabPanel } from '../../tab/Tab'

let GroupPage = React.createClass({
    getInitialState() {
        return {
            group: null,
            loading: true,
            buttonName: '',
            joiningGroup: false,
            leavingGroup: false,
        }
    },
    componentWillMount() {
        let { groupId } = this.props.params

        API.get(`groups/${groupId}`, {}, (group, err) => {
            if ( ! err) {
                if (this.isMounted()) {
                    this.setState({ group, buttonName: group.meta_information.in_group ? 'Groep Verlaten' : 'Lid Worden', loading: false })
                }
            }
        })
    },
    changeTab(tabId) {
        RouterContainer.get().transitionTo("group", { tabId, groupId: this.props.params.groupId })
    },
    leaveGroup() {
        let { group } = this.state

        this.setState({
            leavingGroup: true
        })

        API.post('groups/leave', { group_id: group.id }, (response, err) => {
            if ( ! err) {
                this.setState({ group: response, buttonName: 'Lid Worden', leavingGroup: false })
            }
        })
    },
    joinGroup() {
        let { group } = this.state

        this.setState({
            joiningGroup: true
        })

        API.post('groups/join', { group_id: group.id }, (response, err) => {
            if ( ! err) {
                this.setState({ group: response, buttonName: 'Groep Verlaten', joiningGroup: false })
            }
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
        let { group, buttonName, joiningGroup, leavingGroup } = this.state
        let { params } = this.props
        let memberCount = group.meta_information.member_count
        let inGroup = group.meta_information.in_group

        let loading = joiningGroup || leavingGroup

        return (
            <div>
                <Grid>
                    <Cell center>
                        <Parallax img='/dist/img/banner.jpg' height={300} relative>
                            <button style={{
                                position: 'absolute',
                                right: 10,
                                bottom: 10
                            }} className="btn" onClick={() => {inGroup ? this.leaveGroup() : this.joinGroup()}}>
                                {loading && <Icon className="right" icon="loop" spinning/>}
                                {buttonName}
                            </button>
                        </Parallax>
                    </Cell>
                    <Cell>
                        <Card style={{marginTop: 0, marginBottom: 0}} className="no-shadow">
                            <CardContent>
                                <Grid style={{marginBottom: 0}}>
                                    <Cell width={6/12}>
                                        <img className="left" src="https://avatarize.me/a/malfait.robin@gmail.com?size=100"/>
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
                        <Tab className="white group" marginTop={0} activeTab={params.tabId} onTabChange={this.changeTab}>
                            <TabPanel title="Shouts" tabId="shouts">
                                <Grid>
                                    <Cell width={9/12}>
                                        <ShoutFeed canShout={inGroup} groupId={group.id} url={`shouts/group/${group.id}`}/>
                                    </Cell>
                                    <Cell width={3/12}><h3>Sponsers</h3></Cell>
                                </Grid>
                            </TabPanel>
                            <TabPanel title="Evenementen" tabId="events">
                                <Grid>
                                    <Cell width={9/12}>Evenementen...</Cell>
                                    <Cell width={3/12}><h3>Sponsers</h3></Cell>
                                </Grid>
                            </TabPanel>
                            <TabPanel title="Praesidium"  tabId="praesidium">
                                <Grid>
                                    <Cell width={9/12}>Praesidium...</Cell>
                                    <Cell width={3/12}><h3>Sponsers</h3></Cell>
                                </Grid>
                            </TabPanel>
                        </Tab>
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default GroupPage
