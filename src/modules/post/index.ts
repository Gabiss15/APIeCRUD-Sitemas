import { PrismaPostRepository } from "./repositories/implemetatios/prisma-post.repository";
import { CreatePostController } from "./controllers/create-post.controller";
import { CreatePostService } from "./services/create-post.service";
import { FindOnePostController } from "./controllers/find-one-post.controller";
import { FindOnePostService } from "./services/find-one-post.service";
import { FindPostController } from "./controllers/find-post.controller";
import { FindPostService } from "./services/find-post.service";
import { RemovePostController } from "./controllers/remove-post.controller";
import { RemovePostService } from "./services/remove-post.service";
import { UpdatePostController } from "./controllers/update-post.controller";
import { UpdatePostService } from "./services/update-post.service";

const repository = new PrismaPostRepository()

const createService = new CreatePostService(repository)
const createController = new CreatePostController(createService)

const findOneService = new FindOnePostService(repository)
const findOneController = new FindOnePostController(findOneService)

const findService = new FindPostService(repository)
const findController = new FindPostController(findService)

const removeService = new RemovePostService(repository)
const removeController = new RemovePostController(removeService)

const updateService = new UpdatePostService(repository)
const updateController = new UpdatePostController(updateService)

export { 
    createController,
    findOneController,
    findController,
    removeController,
    updateController
}