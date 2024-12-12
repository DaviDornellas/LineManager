import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../service/index";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes, GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produtos");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao buscar produtos");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    const updatedProduct = products.find((product) => product.id === id);
    try {
      await api.put(`/produtos/${id}`, updatedProduct);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } catch (error) {
      console.error("Erro ao salvar produto", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await api.delete(`/produtos/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto", error);
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setProducts(products.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      width: 120,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
    },
    { field: "id", headerName: "ID", width: 60, editable: false },
    { field: "responsible", headerName: "Responsável", width: 260, editable: true },
    { field: "artwork", headerName: "Origem", width: 100, editable: true },
    { field: "destiwork", headerName: "Destino", width: 100, editable: true },
    { field: "phoneNumber", headerName: "Telefone", width: 150, editable: true },
    { field: "operator", headerName: "Operadora", width: 110, editable: true },
    { field: "date", headerName: "Data", width: 110, editable: true },
    { field: "category", headerName: "Categoria", width: 110, editable: true },
    
  ];

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            // Adicionar lógica de criação aqui
          }}
        >
          Adicionar Produto
        </Button>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          editMode="row"
        />
      </div>
    </div>
  );
};

export default ListProducts;
