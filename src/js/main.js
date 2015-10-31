import React from "react"

import analytics from 'ga-react-router'
import Auth from 'AuthService'
import Notification from 'NotificationActions'
import Router from "react-router"
import RouterContainer from 'RouterContainer'
import routes from "./config/routes"
import WebStorage from 'WebStorage'
import { io } from 'Socket'

let router = Router.create({
    routes: routes,
    location: Router.HistoryLocation
})

RouterContainer.set(router)

let jwt = WebStorage.fromStore('jwt')

if (jwt) {
    Auth.fetchCurrentUser(jwt)
}

// Subscribe to global messages
io.join('global', {
    UpdateAvailable: () => {
        if (confirm("Er is een nieuwe shout versie, wil je de pagina herladen?")) {
            window.location.reload()
        }
    },
    GoingDown: () => Notification.info('De server gaat heel even offline...'),
    GoingUp: () => Notification.info('Sorry voor het ongemak, we zijn er weer :)')
})

// Listen for some global events, like UpdateAvailable
let mountNode = document.getElementById('mount-node')
router.run((Handler, state) => {
    React.render(<Handler />, mountNode)
    analytics(state)
})
