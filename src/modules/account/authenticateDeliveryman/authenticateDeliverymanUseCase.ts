import { prisma } from "../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
interface IAuthenticateDeliveryman{
  username: string
  password: string
}
export class AuthenticateDeliverymanUseCase {
  async execute({username, password}: IAuthenticateDeliveryman){
    // receive deliveryman and password

    // verify if deliveryman created
    const deliveryman = await prisma.deliveryman.findFirst({
      where:{
        username
      }
    })

    if(!deliveryman){
      throw new Error("Deliveryman or password invalid");
    }
    // verify if password correspond with username
    const passwordMatch = await compare(password, deliveryman.password)

    if(!passwordMatch){
      throw new Error("Deliveryman or password invalid")
    }
    // generate token
    const token = sign({ username }, "50d5044f26d5ae724ebc72b1b745800f123", {
      subject:deliveryman.id,
      expiresIn: "1d"
    })

    return token

  }
}