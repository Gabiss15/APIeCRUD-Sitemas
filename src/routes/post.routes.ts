import {
    createController,
    findOneController,
    findController,
    removeController,
    updateController
} from "../modules/post"

import { Router, Request, Response } from "express"

const routes = Router()

routes.post("/posts", (req: Request, res: Response) => {
    createController.handle(req, res)
})

routes.get("/posts", (req: Request, res: Response) => {
    findController.handle(req, res);
});

routes.get("/posts/:id", (req: Request, res: Response) => {
    findOneController.handle(req, res);
});

routes.delete("/posts/:id", (req: Request, res: Response) => {
    removeController.handle(req, res);
});

routes.put("/posts/:id", (req: Request, res: Response) => {
    updateController.handle(req, res);
});

export default routes