import { VehicleModel } from "../../../data/mongodb/models/vehicle.model";
import { CustomError } from "../../../utils/custom-error.util";
import { 
    CreateVehicleDto, 
    PaginatedVehicles, 
    VehicleEntity, 
    VehicleRepository 
} from "../../domain";
import { VehicleMapper } from "../vehicle.mapper";
import { GetAllVehiclesDto } from "../../domain/dtos/get-all-vehicles.dto";
import { PutDeleteVehicleDto } from "../../domain/dtos/put-delete-vehicle.dto";

export class MongoVehicleRepository implements VehicleRepository {
    async delete(deleteVehicleDto: PutDeleteVehicleDto): Promise<void> {
        const { id } = deleteVehicleDto;
        const query = await VehicleModel.findByIdAndDelete(id);
        if(!query) throw CustomError.badRequest("Resource does not exists");
    }

    async put(
        putDeleteVehicleDto: PutDeleteVehicleDto, 
        createVehicleDto: CreateVehicleDto
    ): Promise<VehicleEntity> {
        const query = await VehicleModel.findByIdAndUpdate(
            putDeleteVehicleDto.id, 
            createVehicleDto, 
            { new:true }
        );

        if(!query) return await this.create(createVehicleDto);
        return VehicleMapper.vehicleEntityFromObject(query as any);
    }

    async getAll(
        getAllVehiclesDto: GetAllVehiclesDto
    ): Promise<PaginatedVehicles> {
        const { limit, page, query, filter } = getAllVehiclesDto;
        
        const vehicleEntities: VehicleEntity[] = [];
        const queryOptions: any = !query? { } : {
            $or: [
                { manufacturer: { $regex: query, $options: 'i' } },
                { vin: { $regex: query, $options: 'i' } },
                { model: { $regex: query, $options: 'i' } },
                { economicNumber: { $regex: query, $options: 'i' } },
                { licensePlates: { $regex: query, $options: 'i' } }
            ]
        }

         if(filter){
            const getOperator = {
                "contains": { $regex: filter.value, $options: 'i' },
                "equals": { $eq: filter.value },
                "starts": { $regex: new RegExp(`^${filter.value}` , 'i') },
                "=": { $eq: parseInt(filter.value)},
                "<": { $lt: parseInt(filter.value)},
                "<=": { $lte: parseInt(filter.value)},
                ">": { $gt: parseInt(filter.value)},
                ">=": { $gte: parseInt(filter.value)},
            }
            queryOptions[
                filter.filter as keyof typeof queryOptions
            ] = getOperator[
                filter.operator as keyof typeof getOperator
            ];
         }

        const vehicles = await VehicleModel.find(queryOptions)
            .skip((page - 1) * limit)
            .limit(limit);


        const total = await VehicleModel.countDocuments(
            queryOptions
        )

        for (const doc of vehicles) {
            const vehicle = VehicleMapper.vehicleEntityFromObject(doc);
            vehicleEntities.push(vehicle);
        }

        const totalPages = Math.ceil(total / limit);

        return {
            totalVehicles: total,
            limit,
            totalPages: totalPages,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page > 1 ? page - 1 : undefined,
            nextPage: page < totalPages ? page + 1 : undefined,
            query,
            vehicles: vehicleEntities
        };
    }

    async create(createVehicleDto: CreateVehicleDto): Promise<VehicleEntity> {
        const { vin, licensePlates } = createVehicleDto;
        const current = await VehicleModel.findOne({ $or: [{ vin }, { licensePlates }] });
        if (current) throw CustomError.badRequest("Vehicle already exists");

        const newVehicle = await VehicleModel.create(createVehicleDto);
        await newVehicle.save();
        return VehicleMapper.vehicleEntityFromObject(newVehicle);
    }
}