import { UserEntity } from "../../user/entities/user.entity"

export interface PostEntity {
    id: number
    createdAt: Date;
    updatedAt: Date;
    title: string
    content?: string
    published: boolean
    authorId: UserEntity["id"]
}