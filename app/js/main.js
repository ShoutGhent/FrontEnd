import React from "react"
import Router from "react-router"
import routes from "./Routes"
import WebStorage from './services/WebStorage'
import RouterContainer from './services/RouterContainer'
import Auth from './auth/AuthService'

let router = Router.create({
    routes: routes,
    //location: Router.HistoryLocation
})

RouterContainer.set(router)

let jwt = WebStorage.fromStore('jwt')

if (jwt) {
    Auth.loginUsingJwt(jwt)
}

let mountNode = document.getElementById('mount-node')
router.run(Handler => React.render(<Handler />, mountNode))
