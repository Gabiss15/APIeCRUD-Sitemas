import { PostDTO } from "../dtos/post.dto";
import { CreatePostService } from "../services/create-post.service";
import { Request, Response } from "express";

export class CreatePostController {
    constructor(private readonly service: CreatePostService) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const post = <PostDTO>request.body
        await this.service.execute(post)
        return response.json({ message: "Post criado com sucesso"})
    }
}