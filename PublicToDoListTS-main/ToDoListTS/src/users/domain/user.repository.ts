import User from "./User";

export default interface UserRepository{
    register(user: User): Promise<User>;
    login(user: User): Promise<User>;
    getUserById(id: string): Promise<User>;
}