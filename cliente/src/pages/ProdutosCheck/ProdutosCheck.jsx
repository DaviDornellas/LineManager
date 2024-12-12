import React, { useState, useEffect } from "react";
import ProductFormCheck from "../../components/ProductCheck/ProductFormCheck";
import api from "../../service"; // Serviço para acessar a API
import style from "./ProdutosCheck.module.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar produtos ao montar o componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/produtos"); // Consulta ao endpoint
        setProducts(response.data); // Armazena os produtos recebidos
        setLoading(false); // Finaliza o carregamento
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setError("Erro ao carregar produtos. Tente novamente mais tarde.");
        setLoading(false); // Finaliza o carregamento, mesmo em erro
      }
    };

    loadProducts(); // Chama a função para carregar os produtos
  }, []); // Dependência vazia garante que o código seja executado apenas uma vez

  // Exibe a mensagem de carregamento enquanto os produtos estão sendo buscados
  if (loading) return <p>Carregando produtos...</p>;

  // Exibe a mensagem de erro se houver algum problema na busca
  if (error) return <p>{error}</p>;

  return (
    <div className={style.container}>
      <h2>Lista de Produtos</h2>
      <ProductFormCheck products={products} />
      {/* Passa os produtos para o componente ProductFormCheckd */}
    </div>
  );
};

export default App;
