import { createContext, useState, PropsWithChildren } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";
import { PaginatedVehiclesEntity } from "../../../vehicles/domain";
import { SnackbarOrigin } from "@mui/material";

export type VehicleContextType = {
	paginatedVehicles: PaginatedVehiclesEntity;
	setPaginatedVehicles: (paginatedVehicles: PaginatedVehiclesEntity) => void;
	selectedVehicle: string;
	setSelectedVehicle:(vehicleId: string) => void;
	paginationModel: GridPaginationModel;
	setPaginationModel: (paginationModel: GridPaginationModel)=> void;
	toastProps: ToastProps;
	setToastProps:(toastProps: ToastProps) => void;
};

export type toastSeverity = "error" | "info" | "warning" | "success";
export interface ToastProps {
  message: string;
  severity: toastSeverity;
  location?: SnackbarOrigin;
}
export const VehicleContext = createContext<VehicleContextType| null>(null);

const VehicleProvider = ({ children }: PropsWithChildren) => {
    const [paginatedVehicles, setPaginatedVehicles] = useState<PaginatedVehiclesEntity>();
    const [selectedVehicle, setSelectedVehicle] = useState<string>();
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 0,
        pageSize: 5,
	});
	const [toastProps, setToastProps] = useState<ToastProps>({
		severity: "info",
		message: "",
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
				toastProps,
				setToastProps
			}}
		>
			{children}
		</VehicleContext.Provider>
    )
}

export default VehicleProvider;