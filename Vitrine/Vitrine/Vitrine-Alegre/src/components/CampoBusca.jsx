import React from 'react';
import './CampoBusca.css';

export default function CampoBusca({ onBusca }) {
  return (
    <div className="campo-busca">
      <span className="icone-lupa">🔍</span>
      <input 
        type="text" 
        placeholder="Buscar produtos..." 
        onChange={(e) => onBusca(e.target.value)} // Envia o texto digitado para o App
      />
    </div>
  );
}