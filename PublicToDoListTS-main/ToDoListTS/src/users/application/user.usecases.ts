import User from "../domain/User";
import UserRepository from "../domain/user.repository";
import { compare, hash } from "../../context/security/encrypter";

export class UserUseCases{
    constructor(private readonly userRepository: UserRepository){}

    async register(user: User): Promise<User>{
        const password = user.password ? hash(user.password) : undefined;
        return await this.userRepository.register({
            email: user.email,
            password: password
        })
    }

    async login(user: User): Promise<User>{
        const stored = await this.userRepository.login(user);
        if(
            !stored ||
            user.password === "" ||
            stored.password === "" ||
            !compare(user.password || "", stored.password || "")
        ){
            throw new Error("User not found or password incorrect");
        }else{
            return stored;
        }
    }
}