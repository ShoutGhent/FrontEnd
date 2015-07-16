import alt from "../../alt"

class NotificationActions {
    success(message) {
        this.actions.notify(message, 'success')
    }
    error(message) {
        this.actions.notify(message, 'error')
    }
    info(message) {
        this.actions.notify(message, 'info')
    }
    warning(message) {
        this.actions.notify(message, 'warning')
    }

    notify(message, level) {
        let position = "bl"

        this.dispatch({ message, level, position})
    }
}

export default alt.createActions(NotificationActions)
