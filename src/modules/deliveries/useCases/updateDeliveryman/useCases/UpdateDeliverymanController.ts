import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController {
  async handle(request: Request, response: Response) {
    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();

    const { id_deliveryman } = request;
    const { id } = request.params;

    const delivery = await updateDeliverymanUseCase.execute({
      id_deliveryman,
      id_delivery: id,
    });

    return response.json(delivery)
  }
}
