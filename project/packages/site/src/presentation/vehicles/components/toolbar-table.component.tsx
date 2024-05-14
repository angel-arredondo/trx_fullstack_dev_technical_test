import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from '@mui/icons-material/FilterList';
import CancelIcon from "@mui/icons-material/Cancel";
import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { SearchProps } from "../hooks/fetch-vehicles.hook";
import { VehicleContext, VehicleContextType } from "../context/vehicle.context";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  handleSearchClick: (searchProps: SearchProps | undefined) => void;
}

export function ToolbarTable(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const { searchProps, setSearchProps } = useContext<VehicleContextType>(VehicleContext);
  const [cancel, setCancel] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    const id = nanoid();
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

  const handleKeyDown = (event: { key: string; }) => {
    if(event.key !== 'Enter') return;
    props.handleSearchClick(searchProps);
    setCancel(true);
  }
  interface BadgeProps {
    value: number;
  }

  function Badge(props: BadgeProps) {
    return(
      <div className="badge">
        <span>{props.value}</span>
      </div>
    )
  }

  function CancelButton() {
    return (
      <button
        className="toolbar search-cancel"
        title="cancelar"
        onClick={() => {
          setOpenDialog(false);
          setSearchProps({
            filter: "",
            operator: "",
            value: "",
            query: "",
          });
          if (cancel || !!searchProps.value) 
            props.handleSearchClick(undefined);
          setCancel(false);
        }}
      >
        <CancelIcon className="toolbar cancel-icon" />
      </button>
    );
  }

  return (
    <GridToolbarContainer>
      <div className="toolbar">
        <div className="toolbar buttons">
          <button
            className="toolbar action-button"
            title="nuevo"
            onClick={handleClick}
          >
            <AddIcon />
            nuevo
          </button>
          <button
            className="toolbar action-button"
            onClick={() => setOpenDialog(true)}
          >
            {
              searchProps.filter && 
              searchProps.operator && 
              searchProps.value && 
              <Badge value={1}/>
            }
            Filtros
            <FilterListIcon className="toolbar cancel-filter-icon"/>
          </button>
        </div>
        {openDialog && (
          <div
            className="toolbar dialog-backdrop"
            onClick={() => setOpenDialog(false)}
          >
            <dialog
              open={true}
              className="toolbar dialog-filter"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="toolbar dialog-filter-filter">
                <CancelButton />
                <select
                  title="filtros"
                  defaultValue={searchProps.filter}
                  onChange={({ target }) =>
                    setSearchProps({
                      ...searchProps,
                      filter: target.value,
                      value: "",
                    })
                  }
                >
                  <option value="">Filtros:</option>
                  <option value="seats">Numero asientos</option>
                  <option value="color">Color</option>
                  <option value="year">Año</option>
                </select>
              </div>
              <select
                title="operadores"
                defaultValue={searchProps.operator}
                onChange={({ target }) =>
                  setSearchProps({
                    ...searchProps,
                    operator: target.value,
                    value: "",
                  })
                }
              >
                <option value="">Operadores:</option>
                {searchProps.filter === "color" ? (
                  <>
                    <option value="equals">igual a</option>
                    <option value="contains">contiene</option>
                    <option value="starts">inicia con</option>
                  </>
                ) : (
                  <>
                    <option value="<">{"<"}</option>
                    <option value="<=">{"<="}</option>
                    <option value="=">=</option>
                    <option value=">">{">"}</option>
                    <option value=">=">{">="}</option>

                  </>
                )}
              </select>
              <input
                type={searchProps.filter === "color" ? "text" : "number"}
                value={searchProps.value}
                min={0}
                onChange={({ target }) => {
                  setSearchProps({
                    ...searchProps,
                    value: target.value.trim(),
                  });
                  if (
                    !target.value.trim() ||
                    !searchProps.filter ||
                    !searchProps.operator
                  )
                    return;

                  props.handleSearchClick({
                    ...searchProps,
                    value: target.value,
                  });
                }}
                placeholder="valor"
              />
            </dialog>
          </div>
        )}
        <div className="toolbar search">
          {cancel && <CancelButton />}
          <input
            className="toolbar search-field"
            type="text"
            title="search"
            onKeyDown={handleKeyDown}
            placeholder="Buscar"  
            value={searchProps?.query}
            onChange={(event) =>
              setSearchProps({
                ...searchProps,
                query: event.target.value.trim(),
              })
            }
          />
          <button
            className="toolbar search-button"
            title="buscar"
            onClick={() => {
              props.handleSearchClick(searchProps);
              setCancel(true);
            }}
            disabled={!searchProps?.query.trim()}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </GridToolbarContainer>
  );
}
