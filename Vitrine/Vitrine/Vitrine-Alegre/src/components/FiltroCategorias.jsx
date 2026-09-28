import React from 'react';
import './FiltroCategorias.css';

export default function FiltroCategorias({ categoriaAtiva, setCategoriaAtiva }) {
  const categorias = ["Todas", "smartphones", "mobile-accessories", "mens-watches", "fragrances", "furniture", "groceries", "womens-dresses"];

  return (
    <div className="filtro-barra">
      <div className="categorias-lista">
        {categorias.map((cat, index) => (
          <button 
            key={index} 
            className={`btn-categoria ${cat === categoriaAtiva ? "ativo" : ""}`}
            onClick={() => setCategoriaAtiva(cat)} // Informa a Home qual foi clicada
          >
            {cat}
          </button>
        ))}
        <span className="mais-categorias">+16</span>
      </div>
      
      <div className="ordenar-por">
        <select>
          <option>Ordenar: Relevância</option>
          <option>Menor preço</option>
          <option>Maior preço</option>
        </select>
      </div>
    </div>
  );
}