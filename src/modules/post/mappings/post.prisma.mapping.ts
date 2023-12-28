import { PostEntity } from "../entities/post.entity";
import { Post } from "@prisma/client";

export class PostPrismaMapping {
    static to(post: Post): PostEntity {
        return {
            id: post.id,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            title: post.title,
            content: post.content ?? post.content,
            published: post.published,
            authorId: post.authorId
        }
    }

    static from(post: PostEntity): Post {
        return {
            id: post.id,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            title: post.title,
            content: post.content ?? post.content,
            published: post.published,
            authorId: post.authorId
        }
    }

}