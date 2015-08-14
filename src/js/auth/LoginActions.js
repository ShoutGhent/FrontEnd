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

    changeRadius(radius, cb) {
        API.post('users/me/changeRadius', { radius }, (data, err) => {
            if (cb) {
                cb(data.radius)
            }
            this.dispatch(data.radius)
        })
    }

    getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                let coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }

                API.post('users/me/location', coords, (data, err) => {
                    let user = WebStorage.fromStore('user')
                    user.location = data.location
                    WebStorage.toStore('user', user)
                    this.dispatch(user)
                })

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
        this.dispatch()
    }
}

export default alt.createActions(LoginActions)
