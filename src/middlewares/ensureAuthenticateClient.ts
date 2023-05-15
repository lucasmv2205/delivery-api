import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
  sub: string
}

export async function ensureAuthenticateClient(request: Request, response:Response, next: NextFunction){
  const authHeader = request.headers.authorization;

  if(!authHeader){
    return response.status(401).json({
      message: "Token missing"
    })
  }

  // Bearer 1321o32h1u-ihi321hi

  const [, token] = authHeader.split(" ")

  try {
    const { sub } = verify(token, "50d5044f26d5ae724ebc72b1b745800f") as IPayload

    request.id_client = sub;

    return next()
  } catch (error) {
    return response.status(401).json({
      message: "Token invalid"
    })
  }

}