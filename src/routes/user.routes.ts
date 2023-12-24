import { 
    createController,
    findController,
    findOneController,
    removeController,
    updateController
} from "../modules/user"

import { Router, Request, Response } from "express"

const routes = Router()

routes.post("/users", (req: Request, res: Response) => {
    createController.handle(req, res)
})

routes.get("/users", (req: Request, res: Response) => {
    findController.handle(req, res);
});

routes.get("/users/:id", (req: Request, res: Response) => {
    findOneController.handle(req, res);
});

routes.delete("/users/:id", (req: Request, res: Response) => {
    removeController.handle(req, res);
});

routes.put("/users/:id", (req: Request, res: Response) => {
    updateController.handle(req, res);
});

export default routes