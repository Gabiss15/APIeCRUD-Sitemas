import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../user.repository";
import { UserPrismaMapping } from '../../mappings/user.prisma.mapping';

export class PrismaUserRepository implements UserRepository {
    private prisma
    constructor(){
        this.prisma = new PrismaClient()
    }

    async create(data: UserEntity): Promise<void> {
        try {
            const user = UserPrismaMapping.from(data)
            await this.prisma.user.create({data: user})
        }catch(error){
            throw new Error("Erro em criar usuário")
        }
    }

    async findById(id: number): Promise<UserEntity> {
        try{
            const user = await this.prisma.user.findUniqueOrThrow({ where: { id } })
            return UserPrismaMapping.to(user)
        }catch(error){
            throw new Error("Erro em encontrar usuário")
        }
    }

    async find(): Promise<UserEntity[]> {
        try{
            const users = await this.prisma.user.findMany()
            return users.map(user => UserPrismaMapping.to(user))
        }catch(error){
            throw new Error("Erro em encontrar usuários")
        }
    }

    async update(id: number, data: UserEntity): Promise<void> {
        try {
            const user = UserPrismaMapping.from(data)
            await this.prisma.user.update({ where: {id}, data: user })
        }catch(error){
            throw new Error("Erro em atualizar o usuário")
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.prisma.user.delete({ where: { id }})
        }catch(error){
            throw new Error("Erro ao deletar usuário ")
        }    
    }
}