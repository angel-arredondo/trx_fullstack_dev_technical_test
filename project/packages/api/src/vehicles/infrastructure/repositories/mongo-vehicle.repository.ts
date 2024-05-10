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
        const { limit, page, query } = getAllVehiclesDto;
        const vehicleEntities: VehicleEntity[] = [];
        const queryOptions = {
            $or: [
                { manufacturer: { $regex: query, $options: 'i' } },
                { vin: { $regex: query, $options: 'i' } },
                { model: { $regex: query, $options: 'i' } },
                { economicNumber: { $regex: query, $options: 'i' } },
                { licensePlates: { $regex: query, $options: 'i' } }
            ]
        }
        const vehicles = await VehicleModel.find(
            query ? queryOptions : {}
        ).skip((page - 1) * limit).limit(limit);


        const total = await VehicleModel.countDocuments(
            query ? queryOptions : {}
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