import React, { useState, useEffect } from "react";
import api from "../../service/index";

const EditProduct = ({ product, onProductUpdated }) => {
  const [responsible, setResponsible] = useState(product.responsible);
  const [artwork, setArtwork] = useState(product.artwork);
  const [destiwork, setDestiwork] = useState(product.destiwork);
  const [operator, setOperator] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(product.category);

  useEffect(() => {
    setResponsible(product.responsible);
    setArtwork(product.artwork);
    setDestiwork(product.destiwork);
    setOperator(product.operator);
    setPhoneNumber(product.phoneNumber);
    setDate(product.date);
    setCategory(product.category);
  }, [product]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/produtos/${product.id}`, {
        responsible,
        artwork,
        destiwork,
        operator,
        phoneNumber,
        date,
        category,
      });
      onProductUpdated(response.data);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  return (
    <div>
      <h2>Editar Produto</h2>
      <form onSubmit={handleUpdateProduct}>
        <input
          type="text"
          placeholder="Responsável da Linha"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Obra de Origem"
          value={artwork}
          onChange={(e) => setArtwork(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Obra de Destino"
          value={destiwork}
          onChange={(e) => setDestiwork(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Operadora"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Número da Linha"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Data"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Selecione um Status
          </option>
          <option value="Habilitada">Habilitada</option>
          <option value="Desabilitada">Desabilitada</option>
        </select>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default EditProduct;
