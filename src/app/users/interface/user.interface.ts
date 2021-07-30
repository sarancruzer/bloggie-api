import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Role, User } from "../entities/user.entity";

export const USER_SERVICE = 'USER SERVICE';

export interface IUser {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    password: string,
    role?: Role
}

export interface IUserService {

    create(createUserDto: CreateUserDto);
    
    findAll();

    findOne(id: string): Promise<User | undefined>;

    update(id: number, updateUserDto: UpdateUserDto);

    remove(id: number);
    
    userProfile(currentUser: IUser): Promise<IUser | undefined>;

}

