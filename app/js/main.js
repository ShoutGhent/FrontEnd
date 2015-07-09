import React from "react"
import Router from "react-router"
import routes from "./Routes"

var mountNode = document.getElementById("mount-node")

Router.run(routes, Router.HistoryLocation, Handler => React.render(<Handler />, mountNode))
