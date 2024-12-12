import React from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
             Responsavel da linha: {product.responsible} | Obra de Origem: {product.artwork} | Obra de Destinos: {product.destiwork} | Operadora: {product.operator} | Número da Linha:{" "}
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

export default ProductList;
