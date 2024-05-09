import { Alert, Button, Snackbar } from "@mui/material";
import { useContext } from "react";
import {
  VehicleContext,
  VehicleContextType,
} from "../vehicles/context/vehicle.context";

export const Toast = () => {
  const { toastProps, setToastProps } = useContext<VehicleContextType>(VehicleContext);

  return (
    <Snackbar
      anchorOrigin={
        toastProps.location || { vertical: "top", horizontal: "right" }
      }
      open={!!toastProps.message}
      key={"topright"}
    >
      <Alert
        severity={toastProps.severity}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => setToastProps({ severity: "info", message: "" })}
          >
            Cerrar
          </Button>
        }
      >
        {toastProps.message}
      </Alert>
    </Snackbar>
  );
};
