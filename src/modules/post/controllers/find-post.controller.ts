import { FindPostService } from "../services/find-post.service";
import { Request, Response } from "express";

export class FindPostController {
    constructor(private readonly service: FindPostService) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const posts = await this.service.execute()
        return response.json(posts)    
    }
}