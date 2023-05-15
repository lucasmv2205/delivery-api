import { prisma } from "../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
interface IAuthenticateClient{
  username: string
  password: string
}
export class AuthenticateClientUseCase {
  async execute({username, password}: IAuthenticateClient){
    // receive username and password

    // verify if username created
    const client = await prisma.clients.findFirst({
      where:{
        username
      }
    })

    if(!client){
      throw new Error("Username or password invalid");
    }
    // verify if password correspond with username
    const passwordMatch = await compare(password, client.password)

    if(!passwordMatch){
      throw new Error("Username or password invalid")
    }
    // generate token
    const token = sign({ username }, "50d5044f26d5ae724ebc72b1b745800f", {
      subject:client.id,
      expiresIn: "1d"
    })

    return token

  }
}