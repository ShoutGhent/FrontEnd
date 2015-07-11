import React from "react"
import Router from "react-router"
import routes from "./Routes"
import WebStorage from './services/WebStorage'
import RouterContainer from './services/RouterContainer'
import UserActions from './actions/UserActions'


var router = Router.create({
    routes: routes,
    location: Router.HistoryLocation
})

RouterContainer.set(router)

let jwt = WebStorage.fromStore('jwt')

if (jwt) {
    UserActions.loginUsingJwt(jwt);
}

router.run(Handler => React.render(<Handler />, document.body))
