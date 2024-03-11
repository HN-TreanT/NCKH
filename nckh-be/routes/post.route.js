const Route = require("express").Router()
const controller = require("../controller/post.controller")
const tryCatch = require("../middleware/tryCatch")
Route.get("/", tryCatch(controller.get))
Route.get("/:postId", tryCatch(controller.detail))
Route.post("/", tryCatch(controller.create))
Route.put("/:postId", tryCatch(controller.update))
Route.delete("/:postId", tryCatch(controller.deletePost))
Route.get("/csv/export", tryCatch(controller.exportExcel))

Route.get("/thongke/thongke", tryCatch(controller.thongKe))


module.exports = Route