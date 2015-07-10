import alt from "../alt"
import ApiActions from './ApiActions'

class UserActions extends ApiActions {
    login(user) {
        var payload = user

        super.post("auth/login", payload, (res, err) => {
            console.log(res)
        })

        //this.dispatch(payload)
    }
}

export default alt.createActions(UserActions)
