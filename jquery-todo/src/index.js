const { default: World } = require("./world")

const root = document.getElementById("root")
const world = new World("JQuery Todo")
world.sayHello(root)