import { PostDTO } from "../dtos/post.dto";
import { PostMapping } from "../mappings/post.mapping";
import { PostRepository } from "../repositories/post.repository";

export class CreatePostService {
    constructor(
        private readonly postRepository: PostRepository
    ) { }
    async execute(data: PostDTO): Promise<void>{
        const post = PostMapping.from(data)
        const res = await this.postRepository.create(post)
    }
}