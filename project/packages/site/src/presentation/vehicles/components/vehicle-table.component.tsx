import { useContext, useEffect, useState } from "react";
import {
  DataGrid,
  GridValueGetter,
  GridColDef,
  GridRowParams,
  useGridApiRef,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRowId,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowsProp,
  GridToolbarContainer,
  GridSlots,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
  GridEditInputCell,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { useFetchVehicles } from "../hooks/fetch-vehicles.hook";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { VehicleContext, VehicleContextType } from "../context/vehicle.context";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Validators } from "../../../utils/validators.util";
import { VehicleEntity } from "../../../vehicles/domain";
import { useCreateVehicle } from "../hooks/create-vehicle.hook";
import {
  Alert,
  Box,
  Skeleton,
  Snackbar,
  SnackbarOrigin,
  Stack,
} from "@mui/material";
import { usePutVehicle } from "../hooks/put-vehicle.hook";
import { useDeleteVehicle } from "../hooks/delete-vehicle.hook";

let editingRowIds = [];

type severity = "error" | "info" | "warning" | "success";

interface ToastProps {
  severity: severity;
  message: string;
  location?: SnackbarOrigin;
}

export const VehicleTable = () => {
  const gridApiRef = useGridApiRef();

  const {
    paginationModel,
    setPaginationModel,
    setSelectedVehicle,
    selectedVehicle,
  } = useContext<VehicleContextType>(VehicleContext);

  const { paginatedVehicles, isLoading, error, loadVehicles } =
    useFetchVehicles();

  const [toastProps, setToastProps] = useState<ToastProps>({
    severity: "info",
    message: "",
  });

  const {
    error: putVehicleError,
    isLoading: isPutVehicleLoading,
    putVehicle,
  } = usePutVehicle();

  const {
    error: deleteVehicleError,
    isLoading: isDeleteVehicleLoading,
    deleteVehicle,
  } = useDeleteVehicle();

  const {
    error: createError,
    isLoading: isCreateLoading,
    createVehicle,
  } = useCreateVehicle();

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [rows, setRows] = useState<VehicleEntity[]>([]);

  const errorMessage = "Ocurrió un error al";

  useEffect(() => {
    selectedVehicle && gridApiRef?.current?.selectRow(selectedVehicle, true, true);
  }, [selectedVehicle]);

  useEffect(() => {
    loadVehicles();
  }, [paginationModel]);

  useEffect(() => {
    if (!error && !isLoading) {
      setRows(paginatedVehicles.vehicles);
    }
  }, [isLoading]);

  useEffect(() => {
    error && setToastProps({
      severity: "error",
      message: errorMessage + " cargar las unidades",
    });
  }, [error]);

  useEffect(() => {
    putVehicleError && setToastProps({
      severity: "error",
      message: errorMessage + " actualizar la unidad",
    });
  }, [putVehicleError]);

  useEffect(() => {
    deleteVehicleError && setToastProps({
      severity: "error",
      message: errorMessage + " eliminar la unidad",
    });
  }, [deleteVehicleError]);

  useEffect(() => {
    createError && setToastProps({
      severity: "error",
      message: errorMessage + " registrar la unidad",
    });
  }, [createError]);

  interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = 1;
      setRows((oldRows) => [
        ...oldRows,
        {
          id,
          color: "",
          economicNumber: "",
          insurance: {
            carrier: "",
            number: "",
          },
          licensePlates: "",
          manufacturer: "",
          model: "",
          seats: 5,
          vin: "",
          year: new Date().getFullYear(),
          isNew: true,
        },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "licensePlates" },
      }));
    };

    return (
      <>
        <GridToolbarContainer>
          <Button
            color="primary"
            className="table add-button"
            startIcon={<AddIcon />}
            onClick={handleClick}
          >
            Nuevo
          </Button>
        </GridToolbarContainer>
      </>
    );
  }

  type Row = (typeof paginatedVehicles.vehicles)[number];

  const getInsuranceCarrier: GridValueGetter<Row> = (_value, row) => {
    return `${row.insurance.carrier || ""}`;
  };

  const getInsuranceNumber: GridValueGetter<Row> = (_value, row) => {
    return `${row.insurance.number || ""}`;
  };

  const handleRowClick = ({ row }: GridRowParams) => {
    setSelectedVehicle(row.id);
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew && !editedRow.licensePlates) return;
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    editingRowIds = editingRowIds.filter((editingRowId) => editingRowId != id);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    editingRowIds.push(id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    await deleteVehicle(id as string);
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleProcessRowUpdate = async (updatedRow: any, originalRow: any) => {
    if (updatedRow.isNew) {
      const newVehicle = await createVehicle(updatedRow);
      if (newVehicle) {
        const rowToAdd = { ...updatedRow, isNew: false, id: newVehicle.id };
        setRows(rows.map((row) => (row.id === updatedRow.id ? rowToAdd : row)));
        setToastProps({
          severity: "success",
          message: "Unidad registrada exitosamente",
        });
        return rowToAdd;
      }
      return updatedRow;
    }

    originalRow.insuranceCarrier = updatedRow.insurance.carrier;
    originalRow.insuranceNumber = updatedRow.insurance.number;

    if (JSON.stringify(updatedRow) != JSON.stringify(originalRow)) {
      const updatedVehicle = await putVehicle(updatedRow.id, updatedRow);

      return {
        ...updatedVehicle,
        insuranceCarrier: updatedVehicle.insurance.carrier,
        insuranceNumber: updatedVehicle.insurance.number,
      };
    }
    return originalRow;
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    const editedRow = rows.find((row) => row.isNew);
    if (editedRow) return;
    if (editingRowIds.length > 0) {
      setToastProps({
        severity: "info",
        message: "Debe cancelar las filas en edición",
      });
      return;
    }
    setPaginationModel(model);
  };

  const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },
  }));

  function renderEditInputCell(props: GridRenderEditCellParams) {
    const hasError = !!props.error;
    const errorMessage = props.error;
    props.error = hasError;
    return (
      <StyledTooltip open={hasError} title={errorMessage}>
        <span>
          <GridEditInputCell {...props} />
        </span>
      </StyledTooltip>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Modificar",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id) as any}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id) as any}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "licensePlates",
      headerName: "Placas",
      width: 150,
      type: "string",
      editable: true,
      valueParser: (value) => {
        return value.toUpperCase().trim();
      },
      preProcessEditCellProps: async (params: GridPreProcessEditCellProps) => {
        const { value } = params.props;
        const errorMessage = Validators.getErrorMessage("licensePlates", value);

        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditInputCell,
    },
    {
      field: "economicNumber",
      headerName: "Num. economico",
      width: 150,
      editable: true,
      type: "string",
      valueParser: (value) => {
        return value.trim();
      },
      preProcessEditCellProps: async (params: GridPreProcessEditCellProps) => {
        const { value } = params.props;
        const errorMessage = Validators.getErrorMessage(
          "economicNumber",
          value
        );

        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditInputCell,
    },
    {
      field: "insuranceCarrier",
      headerName: "Aseguradora",
      width: 150,
      valueGetter: getInsuranceCarrier,
      editable: true,
      type: "string",
      valueParser: (value) => {
        return value.trim();
      },
    },
    {
      field: "insuranceNumber",
      headerName: "Num. seguro",
      width: 150,
      valueGetter: getInsuranceNumber,
      editable: true,
      type: "string",
      valueParser: (value) => {
        return value.trim();
      },
    },
    {
      field: "vin",
      headerName: "Vin",
      width: 150,
      editable: true,
      type: "string",
      valueParser: (value) => {
        return value.toUpperCase().trim();
      },
      preProcessEditCellProps: async (params: GridPreProcessEditCellProps) => {
        const { value } = params.props;
        const errorMessage = Validators.getErrorMessage("vin", value);

        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditInputCell,
    },
    {
      field: "seats",
      type: "number",
      headerName: "Asientos",
      width: 150,
      editable: true,
      preProcessEditCellProps: async (params: GridPreProcessEditCellProps) => {
        const { value } = params.props;
        const errorMessage = Validators.getErrorMessage("seats", value);

        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditInputCell,
    },
    {
      field: "manufacturer",
      headerName: "Marca",
      width: 150,
      editable: true,
      type: "string",
      valueParser: (value) => {
        return value.trim();
      },
      preProcessEditCellProps: async (params: GridPreProcessEditCellProps) => {
        const { value } = params.props;
        const errorMessage = Validators.getErrorMessage("manufacturer", value);

        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditInputCell,
    },
    {
      field: "model",
      headerName: "Modelo",
      width: 150,
      editable: true,
      type: "string",
      valueParser: (value) => {
        return value.trim();
      },
      preProcessEditCellProps: async (params: GridPreProcessEditCellProps) => {
        const { value } = params.props;
        const errorMessage = Validators.getErrorMessage("model", value);

        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditInputCell,
    },
    {
      field: "year",
      type: "string",
      headerName: "Año",
      width: 150,
      editable: true,
      valueParser: (value) => {
        return value ? parseInt(value) : 0;
      },
      preProcessEditCellProps: async (params: GridPreProcessEditCellProps) => {
        const { value } = params.props;
        const errorMessage = Validators.getErrorMessage("year", value);

        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditInputCell,
    },
    ,
    {
      field: "color",
      type: "string",
      headerName: "Color",
      width: 150,
      editable: true,
      valueParser: (value) => {
        return value.trim();
      },
      preProcessEditCellProps: async (params: GridPreProcessEditCellProps) => {
        const { value } = params.props;
        const errorMessage = Validators.getErrorMessage("color", value);

        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEditInputCell,
    },
  ];

  return (
    <div className="table container">
      <h1>Vehículos</h1>
      {isLoading && (
        <>
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1.9rem" }} />
        </>
      )}
      {!isLoading && (
        <Stack spacing={2} sx={{ width: "100%", paddingBottom: 30 }}>
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              apiRef={gridApiRef}
              editMode="row"
              rows={rows}
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              columns={columns}
              rowCount={paginatedVehicles?.totalVehicles || 0}
              loading={
                isLoading ||
                isCreateLoading ||
                isPutVehicleLoading ||
                isDeleteVehicleLoading
              }
              pageSizeOptions={[5, 10, 15]}
              paginationModel={paginationModel}
              paginationMode="server"
              onRowClick={handleRowClick}
              onPaginationModelChange={handlePaginationModelChange}
              sx={{
                "& .MuiDataGrid-cell:hover, & .MuiDataGrid-row:hover": {
                  color: "primary.main",
                  backgroundColor: "lightgray",
                },
                boxShadow: 2,
              }}
              processRowUpdate={handleProcessRowUpdate}
              slots={{
                toolbar: EditToolbar as GridSlots["toolbar"],
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
            />
          </Box>
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
                  onClick={() =>
                    setToastProps({ severity: "info", message: "" })
                  }
                >
                  Cerrar
                </Button>
              }
            >
              {toastProps.message}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </div>
  );
};
