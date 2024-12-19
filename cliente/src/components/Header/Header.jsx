import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import AccountIcon from "../../../public/icon.svg"; // Caminho do SVG

function Header() {
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do token
        setRole(payload.role || null);
      }
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      setRole(null); // Define o role como null se ocorrer erro
    }
  }, []);

  return (
    <header className={styles.header}>
      <h1>LineManager</h1>

      <nav className={styles.navbar}>
        {/* Links para login e cadastro */}
        {location.pathname !== "/produtos" &&
          location.pathname !== "/produtoscheck" &&
          location.pathname !== "/profile" &&
          location.pathname !== "/admin" && (
            <>
              <Link to="/login">LOGIN</Link>
              <Link to="/register">CADASTRO</Link>
            </>
          )}

        {/* Navegação autenticada */}
        {location.pathname !== "/login" && location.pathname !== "/register" && (
          <>
            <Link to="/produtos">ADICIONAR</Link>
            <Link to="/produtoscheck">CONSULTAR</Link>
            
            {role === "admin" && <Link to="/admin">CONTAS</Link>}
            <Link to="/profile">
              <img src={AccountIcon} alt="Conta" className={styles.icon} />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
