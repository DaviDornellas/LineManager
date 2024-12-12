import React, { useState } from "react";
import api from "../../service/index";

const AddProduct = ({ onProductAdd }) => {
  const [responsible, setResponsible] = useState("");
  const [artwork, setArtwork] = useState("");
  const [destiwork, setDestiwork] = useState("");
  const [operator, setOperator] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneNumber = (value) => {

    const onlyNums = value.replace(/\D/g, "");

    if (onlyNums.length <= 7) {
      return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
    }
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(
      7,
      11
    )}`;
  };

  const handlePhoneNumberChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);


    if (validatePhoneNumber(formatted)) {
      setPhoneError("");
    } else {
      setPhoneError("Número de telefone inválido.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Número de telefone inválido.");
      return;
    }

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");

    try {
      const response = await api.post("/produtos", {
        responsible,
        artwork,
        destiwork,
        operator,
        phoneNumber: cleanPhoneNumber,
        date,
        category,
      });

      onProductAdd(response.data);


      setResponsible("");
      setArtwork("");
      setDestiwork("");
      setOperator("");
      setPhoneNumber("");
      setDate("");
      setCategory("");
      setPhoneError("");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Responsável da Linha"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value.toUpperCase())}
          required
        />
        <input
          type="text"
          placeholder="Obra de Origem"
          value={artwork}
          onChange={(e) => setArtwork(e.target.value.toUpperCase())}
          required
        />
        <input
          type="text"
          placeholder="Obra de Destino"
          value={destiwork}
          onChange={(e) => setDestiwork(e.target.value.toUpperCase())}
          required
        />
        <input
          type="text"
          placeholder="Operadora"
          value={operator}
          onChange={(e) => setOperator(e.target.value.toUpperCase())}
          required
        />
        <input
          type="tel"
          placeholder="Número da Linha"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
        />
        {phoneError && <p style={{ color: "red", fontSize: "14px" }}>{phoneError}</p>}
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
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddProduct;
