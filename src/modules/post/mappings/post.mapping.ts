import { PostDTO } from "../dtos/post.dto";
import { PostEntity } from "../entities/post.entity";

export class PostMapping {
    static from(post: PostDTO): PostEntity {
        return {
            id: post.id,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            title: post.title,
            content: post.content,
            published: post.published,
            authorId: post.authorId
        }
    }
}