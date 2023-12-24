import { RemoveUserService } from '../services/remove-user.service';
import { Request, Response } from "express";

export class RemoveUserController{
    constructor(private readonly service: RemoveUserService) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        await this.service.execute(Number(id))
        return response.json({ message: "Usuário removido" })
    }
}