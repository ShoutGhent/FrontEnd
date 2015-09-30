var _router = null

let currentPathName = () => {
    let routes = _router.getCurrentRoutes()

    return routes[routes.length - 1].name
}

export default {
    set: (router) => _router = router,
    get: () => _router,
    currentPathName: currentPathName,
    pathNameIs: (name) => currentPathName() == name
}
