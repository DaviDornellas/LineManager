import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ roles }) => {
  // Recupera o token armazenado no localStorage após o login
  const token = localStorage.getItem('token');

  
  // O token é dividido em 3 partes (Header, Payload, Signature) e a segunda parte (Payload) contém os dados
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  // Se não houver token, redireciona o usuário para a página de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Verifica se uma lista de papéis permitidos (roles) foi passada e se o papel do usuário está na lista
  if (roles && roles.length > 0 && !roles.includes(userRole)) {
    // Caso o papel do usuário não esteja na lista de permitidos, redireciona para a página inicial
    return <Navigate to="/produtos" />;
  }

  // Se o usuário estiver autenticado e autorizado, renderiza os componentes filhos da rota protegida
  return <Outlet />;
};

export default PrivateRoute;
