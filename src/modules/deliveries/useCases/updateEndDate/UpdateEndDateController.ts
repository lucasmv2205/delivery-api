import { Request, Response } from "express";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase"

export class UpdateEndDateController{
  async handle(request: Request, response: Response) {
    const updateEndDateUseCase = new UpdateEndDateUseCase();

    const { id_deliveryman } = request;
    const { id } = request.params;

    const delivery = await updateEndDateUseCase.execute({
      id_delivery: id,
      id_deliveryman,
    });

    return response.json(delivery)
  }
}