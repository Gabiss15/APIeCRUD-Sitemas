import { FindOnePostService } from "../services/find-one-post.service";
import { Request, Response } from "express";

export class FindOnePostController {
    constructor(private readonly service: FindOnePostService) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const post = await this.service.execute(Number(id))
        return response.json(post)
    }
}