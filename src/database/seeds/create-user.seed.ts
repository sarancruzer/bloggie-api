import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm/connection/Connection";
import * as bcrypt from 'bcryptjs';
import { Role, User } from "src/app/users/entities/user.entity";
import { IUser } from "src/app/users/interface/user.interface";

export default class CreateUsers implements Seeder {
    users: IUser[] =  [
        {
            firstName: "super",
            lastName:"admin",
            email:"superadmin@yopmail.com",
            mobileNumber:"123456",
            password: bcrypt.hashSync("123456", 10),
            role: Role.SUPERADMIN
        },
        {
            firstName: "admin",
            lastName:"admin",
            email:"admin@yopmail.com",
            mobileNumber:"123456",
            password: bcrypt.hashSync("123456", 10),
            role: Role.ADMIN
        },
        {
            firstName: "saravanan",
            lastName:"nandhan",
            email:"saran3@yopmail.com",
            mobileNumber:"123456",
            password: bcrypt.hashSync("123456", 10),
            role: Role.ADMIN
        },
        {
            firstName: "saravanan",
            lastName:"nandhan",
            email:"saran4@yopmail.com",
            mobileNumber:"123456",
            password: bcrypt.hashSync("123456", 10)
        },
        
        
    ];

    public async run(factory: Factory, connection: Connection): Promise<any> {
        // await connection
        // .createQueryBuilder()
        // .insert()
        // .into(User)
        // .values(this.users)
        // .execute()
    }
  }