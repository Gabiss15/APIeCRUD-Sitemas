import { PostDTO } from "../dtos/post.dto";
import { UpdatePostService } from "../services/update-post.service";
import { Request, Response } from 'express';

export class UpdatePostController {
    constructor(private readonly service: UpdatePostService) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const data = <PostDTO>request.body
        await this.service.execute(Number(id), data)
        return response.json({ message: "Post atualizado" })
    } 
}