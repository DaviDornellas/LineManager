import React, { useState, useEffect } from "react";
import { DataGrid, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import api from "../../service/index";
import { Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CancelIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produtos");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError("Erro ao buscar produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        product.responsible.toLowerCase().includes(searchName.toLowerCase()) &&
        product.phoneNumber.includes(searchPhone)
      );
    });
    setFilteredProducts(filtered);
  }, [searchName, searchPhone, products]);

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setEditingRowId(id);
  };

  const handleSaveClick = (id) => async () => {
    const updatedProduct = products.find((product) => product.id === id);
    try {
      await api.put(`/produtos/${id}`, updatedProduct);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      setEditingRowId(null);
    } catch (error) {
      console.error("Erro ao salvar produto", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View, ignoreModifications: true } });
    setEditingRowId(null);
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await api.delete(`/produtos/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto", error);
    }
  };

  const handleAddClick = () => {
    const newProduct = {
      id: Date.now(),
      responsible: "",
      artwork: "",
      destiwork: "",
      phoneNumber: "",
      operator: "",
      date: "",
      category: "",
      isNew: true,
    };
    setProducts([newProduct, ...products]);
    setRowModesModel({ ...rowModesModel, [newProduct.id]: { mode: GridRowModes.Edit } });
    setEditingRowId(newProduct.id);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setProducts(products.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
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
              sx={{
                color: "#009B77",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            disabled={editingRowId !== null && editingRowId !== id}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            disabled={editingRowId !== null}
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

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <TextField
          label="Filtrar por Responsável"
          variant="outlined"
          size="small"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <TextField
          label="Filtrar por Telefone"
          variant="outlined"
          size="small"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        
      </div>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          editMode="row"
          disableSelectionOnClick
          sx={{
            backgroundColor: "#fff", // Fundo branco
            border: "1px solid #ccc", // Borda cinza clara
            borderRadius: "8px", // Bordas arredondadas
            '& .MuiDataGrid-cell': {
              borderBottom: "1px solid #e0e0e0", // Linhas horizontais
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: "#f5f5f5", // Fundo do cabeçalho
              borderBottom: "1px solid #ccc",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ListProducts;
