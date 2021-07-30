import * as Faker from 'faker';
import { User } from 'src/app/users/entities/user.entity';
import { define } from "typeorm-seeding";


define(User, (faker: typeof Faker) => {
    const randomValue = faker.random.number(1)
    const firstName = faker.name.firstName(randomValue)
    const lastName = faker.name.lastName(randomValue)
    const email = firstName + "@yopmail.com"
    const mobile = faker.phone.phoneNumber()
   
    const user = new User()
    user.firstName = firstName
    user.firstName = lastName
    user.email = email
    user.password = faker.random.word()
    user.mobileNumber = mobile
    return user
  })