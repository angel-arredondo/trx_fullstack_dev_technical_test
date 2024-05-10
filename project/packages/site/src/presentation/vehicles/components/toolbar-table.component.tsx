import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import { nanoid } from "nanoid";
import { useState } from "react";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  handleSearchClick: (searchValue: string) => void;
}

export function ToolbarTable(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const [search, setSearch] = useState("");
  const [cancel, setCancel] = useState(false);
  
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

  return (
    <>
      <GridToolbarContainer>
        <div className="toolbar">
          <button
            className="toolbar add-button"
            title="nuevo"
            onClick={handleClick}
          >
            <AddIcon />
            nuevo
          </button>
          <div className="toolbar search">
            {cancel && (
              <button
                className="toolbar search-cancel"
                title="cancelar"
                onClick={() => {
                  props.handleSearchClick("");
                  setSearch("");
                  setCancel(false);
                }}
              >
                <CancelIcon className="toolbar cancel-icon" />
              </button>
            )}
            <input
              className="toolbar search-field"
              type="text"
              title="search"
              placeholder="Buscar"
              value={search}
              onChange={(event) => setSearch(event.target.value.trim())}
            />
            <button
              className="toolbar search-button"
              title="buscar"
              onClick={() => {
                props.handleSearchClick(search);
                setCancel(true);
              }}
              disabled={!search.trim()}
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </GridToolbarContainer>
    </>
  );
}
