import { PaginationModel } from "mongoose-paginate-ts";
import { VehicleModel } from "../../../data/mongodb/models/vehicle.model";
import { CustomError } from "../../../utils/custom-error.util";
import { CreateVehicleDto, PaginationVehicle, VehicleEntity, VehicleRepository } from "../../domain";
import { VehicleMapper } from "../vehicle.mapper";
import { GetAllVehiclesDto } from "../../domain/dtos/get-all-vehicles.dto";


export class MongoVehicleRepository implements VehicleRepository{
    async getAll(
        getAllVehiclesDto: GetAllVehiclesDto
    ): Promise<PaginationVehicle> {
        try{
            const { limit, page, query, sort } = getAllVehiclesDto;
            const vehicleEntities: VehicleEntity[] = [];
            const queryOptions = {
                $or:[
                    {manufacturer:{$regex:query, $options: 'i'}},
                    {vin:{$regex:query, $options: 'i'}},
                    {model:{$regex:query, $options: 'i'}},
                    {economicNumber:{$regex:query, $options: 'i'}},
                    {licensePlates:{$regex:query, $options: 'i'}}
                ]
            } 
            const vehicles = await VehicleModel.find(
                query ? queryOptions : {}
            ).skip((page-1)*limit).limit(limit);

            // if(sort.length > 1)
            //     vehicles.sort(sort)
            
            const total = await VehicleModel.countDocuments(
                query ? queryOptions : {}
            )
            
            for (const doc of vehicles){
                const vehicle = VehicleMapper.vehicleEntityFromObject(doc);
                vehicleEntities.push(vehicle);
            }

            const totalPages = Math.ceil(total / limit);
            // if(!vehiclesResult) return {} as any;
    
           

            return {
                totalVehicles: total,
                limit,
                totalPages: totalPages,
                page,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                prevPage: page > 1 ? page - 1 : undefined,
                nextPage: page < totalPages ? page + 1 : undefined,
                vehicles: vehicleEntities
            };
        } catch (error){
            console.error(error)
            throw error
        }
       
    }
    async create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
        try{
            const { vin, licensePlates } = createVehicleDto;
            const current = await VehicleModel.findOne({$or:[{vin},{licensePlates}]});
            if(current) throw CustomError.badRequest("Vehicle already exists");

            const newVehicle = await VehicleModel.create(createVehicleDto);
            await newVehicle.save();
            return VehicleMapper.vehicleEntityFromObject(newVehicle);
        } catch (error){
            if(error instanceof CustomError)
                throw error

            throw error;
        }
    }

}