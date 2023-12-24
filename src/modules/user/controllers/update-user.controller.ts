import { UserDTO } from "../dtos/user.dto";
import { UpdateUserService } from "../services/update-user.service";
import { Request, Response } from 'express';

export class UpdateUserController {
    constructor(private readonly service: UpdateUserService) { }
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params
        const data = <UserDTO>request.body
        await this.service.execute(Number(id), data)
        return response.json({ message: "Usuário atualizado" })
    }
}