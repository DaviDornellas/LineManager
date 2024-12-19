import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Função para buscar os dados do usuário
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Adicionando o token no header
          },
        });

        setUser(response.data);
      } catch (err) {
        // Se houver erro na requisição (token inválido ou expirado), exibe a mensagem
        setError('Erro ao carregar dados do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]); 

  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    navigate('/login'); 
  };

  return (
    <div className="container">
      <h1>Perfil do Usuário</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : user ? (
        <div>
          <p><strong>Nome:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
         
          <button 
            onClick={handleLogout} 
            style={{ 
              marginTop: '20px', 
              padding: '10px', 
              backgroundColor: '#ff4d4d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
          >
            SAIR
          </button>
        </div>
      ) : (
        <p>Nenhum dado encontrado</p>
      )}
    </div>
  );
};

export default Profile;
