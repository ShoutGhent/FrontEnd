import React from "react"

import Auth from './auth/AuthService'
import Router from "react-router"
import RouterContainer from './services/RouterContainer'
import routes from "./Routes"
import WebStorage from './services/WebStorage'
import analytics from 'ga-react-router'
import Notification from './components/notification/NotificationActions.js'

import { io } from './services/Socket'

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
io.join('global')

// Listen for some global events, like UpdateAvailable
io.listen('global:shout.events.UpdateAvailable', (data) => {
    if (confirm("Er is een nieuwe shout versie, wil je de pagina herladen?")) {
        window.location.reload()
    }
})

io.listen('global:shout.events.GoingDown', () => {
    Notification.info('De server gaat heel even offline...')
})

io.listen('global:shout.events.GoingUp', () => {
    Notification.info('Sorry voor het ongemak, we zijn er weer :)')
})

let mountNode = document.getElementById('mount-node')
router.run((Handler, state) => {
    React.render(<Handler />, mountNode)
    analytics(state)
})
