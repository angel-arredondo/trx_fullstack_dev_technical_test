import { createContext, useState, PropsWithChildren } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";
import { PaginatedVehiclesEntity } from "../../../vehicles/domain";

export type VehicleContextType = {
	paginatedVehicles: PaginatedVehiclesEntity;
	setPaginatedVehicles: (paginatedVehicles: PaginatedVehiclesEntity) => void;
	selectedVehicle: string;
	setSelectedVehicle:(vehicleId: string) => void;
	paginationModel: GridPaginationModel;
	setPaginationModel: (paginationModel: GridPaginationModel)=> void;
	searchProps: SearchProps;
	setSearchProps: (searchProps: SearchProps) => void;
};

export interface SearchProps {
    query?: string;
    filter?: string;
    operator: string;
    value: string;
}

export const VehicleContext = createContext<VehicleContextType| null>(null);

const VehicleProvider = ({ children }: PropsWithChildren) => {
    const [paginatedVehicles, setPaginatedVehicles] = useState<PaginatedVehiclesEntity>();
    const [selectedVehicle, setSelectedVehicle] = useState<string>();
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 0,
        pageSize: 5,
	});
	const [searchProps, setSearchProps] = useState<SearchProps>({
		filter: "",
		operator: "",
		value: "",
		query: "",
	  });


    return (
        <VehicleContext.Provider
			value={{
				paginatedVehicles,
				setPaginatedVehicles,
				selectedVehicle,
				setSelectedVehicle,
				paginationModel,
				setPaginationModel,
				searchProps,
				setSearchProps
			}}
		>
			{children}
		</VehicleContext.Provider>
    )
}

export default VehicleProvider;