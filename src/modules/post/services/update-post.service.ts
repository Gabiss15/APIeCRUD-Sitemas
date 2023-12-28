import { PostDTO } from "../dtos/post.dto";
import { PostMapping } from "../mappings/post.mapping";
import { PostRepository } from "../repositories/post.repository";

export class UpdatePostService {
    constructor(
        private readonly postRepository: PostRepository
    ) {}
    async execute(id: number, data: PostDTO): Promise<void> {
        const post = PostMapping.from(data)
        await this.postRepository.update(id, post)
    }
}