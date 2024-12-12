import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);  // Para armazenar erros de login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);  // Limpa os erros antes de uma nova tentativa

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, role } = response.data;
      
      // Armazenar o token no localStorage ou sessionStorage
      localStorage.setItem('token', token);
     

      if (role === "admin") {
        navigate("/profile");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      setError("E-mail ou senha incorretos. Tente novamente."); 
    }
  };

  return (
    <div className={style.login}>
      
      <form onSubmit={handleLogin}>
      <h1>Login</h1>  
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
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Exibe a mensagem de erro */}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
