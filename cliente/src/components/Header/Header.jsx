import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <h1>LineManager</h1>

      <nav className={styles.navbar}>
        
        {location.pathname !== "/produtos" && location.pathname !== "/produtoscheck" && location.pathname !== "/profile" && (
          <>
           <Link to="/login">LOGIN</Link>
           <Link to="/register">CADASTRO</Link>
          </>
        )}

     
        {location.pathname !== "/login" && location.pathname !== "/register" && (
          <>
            <Link to="/produtos"> ADICIONAR</Link>
            <Link to="/produtoscheck">CONSULTAR</Link>
            <Link to="/profile">SUA CONTA</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
