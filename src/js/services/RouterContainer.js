var _router = null

let current = () => {
    let routes = _router.getCurrentRoutes()

    return routes[routes.length - 1]
}

let currentPathName = () => {
    return current().name
}

let currentPath = () => {
    return current().path
}

export default {
    set: (router) => _router = router,
    get: () => _router,
    currentPathName: currentPathName,
    currentPath: currentPath,
    pathNameIs: (name) => currentPathName() == name
}
