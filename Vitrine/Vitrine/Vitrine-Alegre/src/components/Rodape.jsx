import React from 'react';
import './Rodape.css'; // Crie este arquivo

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-container">
        <div className="rodape-logo">
           <span className="logo-icon-pequeno">V</span>
           <strong>Vitrine</strong> Alegre
        </div>
        <div className="rodape-creditos">
          <p>Projeto acadêmico · Ifes Campus de Alegre · TADS</p>
        </div>
        <div className="rodape-avisos">
          <p>Dados: dummyjson.com</p>
          <p>Imagens e produtos são fictícios</p>
        </div>
      </div>
    </footer>
  );
}