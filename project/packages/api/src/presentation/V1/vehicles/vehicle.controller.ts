import { Request, Response } from "express";
import { CreateVehicleDto, VehicleRepository } from "../../../vehicles/domain";
import { CreateVehicleUseCase } from "../../../vehicles/use-cases/create-vehicle.use.case";
import { CustomError } from "../../../utils/custom-error.util";
import { GetAllVehiclesUseCase } from "../../../vehicles/use-cases/get-all-vehicles.use-case";
import { GetAllVehiclesDto } from "../../../vehicles/domain/dtos/get-all-vehicles.dto";
import { PutDeleteVehicleDto } from "../../../vehicles/domain/dtos/put-delete-vehicle.dto";
import { PutVehicleUseCase } from "../../../vehicles/use-cases/put-vehicle.use-case";
import { DeleteVehicleUseCase } from "../../../vehicles/use-cases/delete-vehicle.use-case";

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

    getAllVehicles = (req: Request, res: Response) => {
        const [error, getAllVehiclesDto] = GetAllVehiclesDto.create(req.query);
        
        if(error) return res.status(400).json({ error });

        new GetAllVehiclesUseCase(this.vehicleRepository)
            .execute(getAllVehiclesDto!)
            .then(result => res.status(200).json(result))
            .catch(error => this.handleError(error, res));
    }

    putVehicle = (req: Request, res: Response) => {
        const [
            putDeleteDtoError, 
            putDeleteVehicleDto
        ] = PutDeleteVehicleDto.create(req.params);

        if(putDeleteDtoError) 
            return res.status(400).json({ error: putDeleteDtoError });

        const [
            createDtoError, 
            createVehicleDto
        ] = CreateVehicleDto.create(req.body);

        if(createDtoError) 
            return res.status(400).json({ error: createDtoError });

        new PutVehicleUseCase(this.vehicleRepository)
            .execute(putDeleteVehicleDto!, createVehicleDto!)
            .then(result => res.status(200).json(result))
            .catch(error => this.handleError(error, res));
    }

    deleteVehicle = (req: Request, res: Response) => {
        const [
            putDeleteDtoError, 
            putDeleteVehicleDto
        ] = PutDeleteVehicleDto.create(req.params);

        if(putDeleteDtoError) 
            return res.status(400).json({ error: putDeleteDtoError });

        new DeleteVehicleUseCase(this.vehicleRepository)
            .execute(putDeleteVehicleDto!)
            .then(()=>res.status(204).json())
            .catch(error => this.handleError(error, res));
    }
}