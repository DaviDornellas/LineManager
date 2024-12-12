import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
 try {
   await axios.post('http://localhost:5000/api/auth/register', {
     username,
     email,
     password,
     role
     
   });
   console.log("deu certo no try")
   navigate('/login'); // Redirecionar para a página de login após o cadastro
 } catch (error) {
   setError(error.response?.data?.error || 'Erro ao cadastrar');
 }
};

  return (
    <div className={style.cadastro}>
      
      <form onSubmit={handleRegister}>
      <h1>Cadastrar</h1>
        <div>
          <input
            type="text"
            value={username}
            placeholder="Nome de Usuário"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="Passoword"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          
        </div>
        <div>
        <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value={"user"}>Usuário</option>
            <option value={"admin"}>Administrador</option>
          </select>
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
