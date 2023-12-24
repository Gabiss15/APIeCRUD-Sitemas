import { UserDTO } from "../dtos/user.dto";
import { CreateUserService } from "../services/create-user.services";
import { Request, Response } from "express";

export class CreateUserController {
    constructor(private readonly service: CreateUserService) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const user = <UserDTO>request.body
        await this.service.execute(user)
        return response.json({ message: "Usuário criado com sucesso"})
    }
}