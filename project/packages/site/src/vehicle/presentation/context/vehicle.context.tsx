import { createContext, useState, PropsWithChildren } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";
import { ApiVehicleEntity, SiteVehicleEntity } from "../../domain";


export interface PaginationVehicle {
    totalVehicles: number | undefined;
    limit: number | undefined;
    totalPages: number | undefined;
    page: number | undefined;
    hasPrevPage: Boolean | undefined;
    hasNextPage: Boolean | undefined;
    prevPage: number | undefined;
    nextPage: number | undefined;
    vehicles: ApiVehicleEntity[];
}

export type VehicleContextType = {
	paginatedVehicles: PaginationVehicle;
	setPaginatedVehicles: (paginatedVehicles: PaginationVehicle) => void;
	selectedVehicle: SiteVehicleEntity;
	setSelectedVehicle:(vehicle: SiteVehicleEntity) => void;
	paginationModel: GridPaginationModel;
	setPaginationModel: (paginationModel: GridPaginationModel)=> void;
};
export const VehicleContext = createContext<VehicleContextType| null>(null);

const VehicleProvider = ({ children }: PropsWithChildren) => {
    const [paginatedVehicles, setPaginatedVehicles] = useState<PaginationVehicle>();
    const [selectedVehicle, setSelectedVehicle] = useState<SiteVehicleEntity>();
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 0,
        pageSize: 5,
	});

    return (
        <VehicleContext.Provider
			value={{
				paginatedVehicles,
				setPaginatedVehicles,
				selectedVehicle,
				setSelectedVehicle,
				paginationModel,
				setPaginationModel
			}}
		>
			{children}
		</VehicleContext.Provider>
    )
}

export default VehicleProvider;