import { Request, Response } from "express";
import { CreateVehicleDto, VehicleRepository } from "../../../vehicles/domain";
import { CreateVehicleUseCase } from "../../../vehicles/use-cases/create-vehicle.use.case";
import { CustomError } from "../../../utils/custom-error.util";

export class VehicleController {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ){}

    private handleError = (error: unknown, res: Response) =>{
        if(error instanceof CustomError){
            return res
                .status(error.options.statusCode)
                .json({error: error.message})
        }
        console.error(error)
        return res.status(500).json({error: 'Internal Server Error'});
    }

    createVehicle = (req: Request, res: Response) => {
        const [error, createVehicleDto] = CreateVehicleDto.create(req.body);
        if(error) return res.status(400).json({ error });

        new CreateVehicleUseCase(this.vehicleRepository)
            .execute(createVehicleDto!)
            .then(result => res.status(201).json(result))
            .catch(error => this.handleError(error, res));
    }

    getAllVehicles = (_req: Request, res: Response) => {
        return res.status(200).json("get")
    }
}