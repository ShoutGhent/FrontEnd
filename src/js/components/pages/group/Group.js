import React from 'react'

import AddShout from '../../pages/shout/AddShout'
import API from '../../../services/API'
import Icon from '../../partials/Icon'
import Loading from '../../loading/Loading'
import Parallax from '../../partials/Parallax'
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
            isAddShoutFormOpen: false
        }
    },
    componentDidMount() {
        let { groupId } = this.props.params

        API.get(`groups/${groupId}`, {}, (group, err) => {
            if ( ! err) {
                if (this.isMounted()) {
                    this.setState({ group, loading: false })
                }
            }
        })
    },
    shoutWasAdded(shout) {
        this.setState({
            isAddShoutFormOpen: false
        })
    },
    openAddShoutForm() {
        this.setState({
            isAddShoutFormOpen: true
        })
    },
    render() {
        let { group, loading, isAddShoutFormOpen } = this.state

        return (
            <div className="container">
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Grid>
                        <Cell center>
                            <Parallax img='/dist/img/banner.jpg' height={300}/>
                        </Cell>
                        <Cell>
                            <Card style={{marginTop: 0, marginBottom: 0}} className="no-shadow">
                                <CardContent>
                                    <Grid>
                                        <Cell width={6/12}>
                                            <img className="left" src="https://avatarize.me/a/malfait.robin@gmail.com?size=100"/>
                                            <h4 className="left" style={{marginLeft: 20}}>{group.name}</h4>
                                        </Cell>
                                        <Cell width={6/12}>

                                        </Cell>
                                    </Grid>
                                    <button className="btn-floating right" onClick={this.openAddShoutForm}>
                                        <Icon icon="add"/>
                                    </button>
                                </CardContent>
                            </Card>
                        </Cell>
                        <Cell>
                            <Tab className="white group" marginTop={0}>
                                <TabPanel title="Shouts">
                                    <Grid>
                                        <Cell width={9/12}><ShoutFeed url={`shouts/group/${group.id}`}/></Cell>
                                        <Cell width={3/12}><h3>Sponsers</h3></Cell>
                                    </Grid>
                                </TabPanel>
                                <TabPanel title="Evenementen">
                                    <Grid>
                                        <Cell width={9/12}>Evenementen...</Cell>
                                        <Cell width={3/12}><h3>Sponsers</h3></Cell>
                                    </Grid>
                                </TabPanel>
                                <TabPanel title="Praesidium">
                                    <Grid>
                                        <Cell width={9/12}>Praesidium...</Cell>
                                        <Cell width={3/12}><h3>Sponsers</h3></Cell>
                                    </Grid>
                                </TabPanel>
                            </Tab>
                        </Cell>
                    </Grid>
                    <AddShout groupId={group.id} isOpen={isAddShoutFormOpen} onDone={this.shoutWasAdded}/>
                </div>
            )}
            </div>
        )
    }
})

export default GroupPage
