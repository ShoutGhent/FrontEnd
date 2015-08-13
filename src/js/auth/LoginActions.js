import alt from "../alt"

import API from '../services/API'
import Redirect from "../services/Redirect"
import WebStorage from "../services/WebStorage"

class LoginActions {
    loginUser(jwt, user, redirect) {
        if (redirect) {
            Redirect.toNext()
        }

        WebStorage.toStore('jwt', jwt)
        WebStorage.toStore('user', user)

        this.dispatch({ user, jwt })
    }

    logoutUser() {
        WebStorage.remove('jwt')
        WebStorage.remove('user')

        Redirect.to('/auth/login')

        this.dispatch()
    }

    changeUserInformation(data) {
        let user = WebStorage.fromStore('user')
        for(var key in data) {
            user[key] = data[key]
        }
        WebStorage.toStore('user', user)
        this.dispatch({ user })
    }

    getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }

                WebStorage.toStore('coords', coords)

                API.post('users/me/location', { latitude: coords.latitude, longitude: position.coords.longitude }, (data, err) => {
                    let user = WebStorage.fromStore('user')
                    user.location = data.location
                    WebStorage.toStore('user', user)
                })

                this.dispatch(coords)
            }, (err) => {
                console.log(err)
            }, {
                maximumAge: 600000,
                timeout: 5000,
                enableHighAccuracy: true
            })
        }
    }

    resetLocation() {
        WebStorage.remove('coords')
        this.dispatch()
    }
}

export default alt.createActions(LoginActions)
