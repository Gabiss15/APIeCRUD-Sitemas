import { PostEntity } from "../entities/post.entity";

export interface PostRepository {
    create(data: PostEntity): Promise<void>
    findById(id: number): Promise<PostEntity>
    find(): Promise<PostEntity[]>
    update(id: number, data: PostEntity): Promise<void>
    delete(id: number): Promise<void>
}