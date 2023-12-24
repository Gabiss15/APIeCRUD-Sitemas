import { Router } from "express";
import UserRoutes from "./user.routes"
import PostRoutes from "./post.routes"

const routes = Router()

routes.use(UserRoutes)
routes.use(PostRoutes)

export default routes