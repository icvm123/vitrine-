import React from 'react';
import { Link } from 'react-router-dom'; 
import './Cabecalho.css';
import BotaoCarrinho from './BotaoCarrinho';
import CampoBusca from './CampoBusca';

export default function Cabecalho({ cartCount, onBusca }) {
  return (
    <header className="cabecalho">
      <div className="cabecalho-container">
        <div className="grupo-logo-menu">
          <button className="btn-menu-mobile">☰</button>
          <Link to="/" className="logo-container" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="logo-icon">V</div>
            <span className="logo-text"><strong>Vitrine</strong> Alegre</span>
          </Link>
        </div>
        
        <div className="busca-container">
            <CampoBusca onBusca={onBusca} />
        </div>

        <div className="acoes-usuario">
          <a href="#" className="link-entrar">Entrar</a>
          <Link to="/carrinho" style={{ textDecoration: 'none' }}>
            <BotaoCarrinho cartCount={cartCount} />
          </Link>
        </div>
      </div>
    </header>
  );
}