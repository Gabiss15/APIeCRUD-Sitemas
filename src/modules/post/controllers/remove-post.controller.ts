import { RemovePostService } from "../services/remove-post.service";
import { Request, Response } from "express";

export class RemovePostController {
    constructor(private readonly service: RemovePostService) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        await this.service.execute(Number(id))
        return response.json({ message: "Post removido com sucesso" })
    }
}