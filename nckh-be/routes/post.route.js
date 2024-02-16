const Route = require("express").Router()
const controller = require("../controller/post.controller")
const tryCatch = require("../middleware/tryCatch")
Route.get("/", tryCatch(controller.get))
Route.get("/:postId", tryCatch(controller.detail))
Route.post("/", tryCatch(controller.create))
Route.put("/:postId", tryCatch(controller.update))
Route.delete("/:postId", tryCatch(controller.deletePost))


module.exports = Route