import { PrismaClient } from "@prisma/client";
import { PostEntity } from '../../entities/post.entity';
import { PostRepository } from "../post.repository";
import { PostPrismaMapping } from "../../mappings/post.prisma.mapping";

export class PrismaPostRepository implements PostRepository {
    private prisma 
    constructor(){
        this.prisma = new PrismaClient()
    }

    async create(data: PostEntity): Promise<void> {
        try {
            const post = PostPrismaMapping.from(data)
            await this.prisma.post.create({ data: post })
        } catch (error) {
            console.error(error)
            throw new Error("Erro em criar um post")
        }
    }

    async findById(id: number): Promise<PostEntity> {
        try {
            const post = await this.prisma.post.findUniqueOrThrow({ where: { id } })
            return PostPrismaMapping.to(post) 
        } catch (error) {
            throw new  Error("Erro em encontrar o post")
        }
    }

    async find(): Promise<PostEntity[]> {
        try {
            const posts = await this.prisma.post.findMany()
            return posts.map(post => PostPrismaMapping.to(post))
        } catch (error) {
            throw new Error("Erro em encontrar todos os posts")
        }
    }

    async update(id: number, data: PostEntity): Promise<void> {
        try {
            const post = PostPrismaMapping.from(data)
            await this.prisma.post.update({ where: {id}, data: post })
        } catch (error) {
            throw new Error("Erro ao atualizar o post")
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.prisma.post.delete({ where: { id }})
        } catch (error) {
            throw new Error("Erro ao deletar post")
        }
    }

}
