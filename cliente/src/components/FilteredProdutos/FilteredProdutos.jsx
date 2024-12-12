import React, { useState } from "react";

const FilteredProductList = ({ products, onEdit, onDelete }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      
      <label>Filtrar </label>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Todos</option>
        <option value="Habilitada">Habilitada</option>
          <option value="Desabilitada">Desabilitada</option>
        
      </select>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
             Responsavel da linha: {product.responsible} |Obra de Origem: {product.artwork} | Obra de Destinos: {product.destiwork} | Operadora: {product.operator} | Número da Linha:{" "}
            {product.phoneNumber} | Data: {product.date} | Categoria:{" "}
            {product.category}
            <button onClick={() => onEdit(product)}>Editar</button>
            <button onClick={() => onDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredProductList;
