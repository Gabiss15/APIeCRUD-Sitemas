import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
    create(data: UserEntity): Promise<void>
    findById(id: number): Promise<UserEntity>
    find(): Promise<UserEntity[]>
    update(id: number, data: UserEntity): Promise<void>
    delete(id: number): Promise<void>
}