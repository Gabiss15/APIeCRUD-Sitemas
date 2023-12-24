import { PrismaUserRepository } from "./repositories/implemetations/prisma-user.repository";
import { CreateUserController } from "./controllers/create-user.controllers";
import { CreateUserService } from "./services/create-user.services";
import { FindOneUserController } from "./controllers/find-one-user.controller";
import { FindOneUserService } from "./services/find-one-user.service";
import { FindUserController } from "./controllers/find-user.controller";
import { FindUserService } from "./services/find-user.service";
import { RemoveUserController } from "./controllers/remove-user.controller";
import { RemoveUserService } from "./services/remove-user.service";
import { UpdateUserController } from "./controllers/update-user.controller";
import { UpdateUserService } from "./services/update-user.service";

const repository = new PrismaUserRepository()

const createService = new CreateUserService(repository)
const createController = new CreateUserController(createService)

const findOneService = new FindOneUserService(repository)
const findOneController = new FindOneUserController(findOneService)

const findService = new FindUserService(repository)
const findController = new FindUserController(findService)

const removeService = new RemoveUserService(repository)
const removeController = new RemoveUserController(removeService)

const updateService = new UpdateUserService(repository)
const updateController = new UpdateUserController(updateService)

export {
    createController,
    findOneController,
    findController,
    removeController,
    updateController
}
