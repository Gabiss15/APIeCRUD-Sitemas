import { FindUserService } from "../services/find-user.service";
import { Request, Response } from "express"

export class FindUserController {
    constructor(private readonly service: FindUserService) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const users = await this.service.execute()
        return response.json(users)
    }
}