import React from 'react';
import { Link } from 'react-router-dom';
import './CardProduto.css';

export default function CardProduto({ produto, onAddToCart }) {
  const precoOriginal = (produto.price / (1 - produto.discountPercentage / 100)).toFixed(2);

  return (
    <div className="card-produto">
      <Link to={`/produto/${produto.id}`} className="imagem-container">
         <span className="badge-desconto">-{Math.round(produto.discountPercentage)}%</span>
         <img src={produto.thumbnail} alt={produto.title} />
      </Link>
      
      <div className="info-produto">
        <span className="categoria">{produto.category.replace('-', ' ').toUpperCase()}</span>
        <Link to={`/produto/${produto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="titulo">{produto.title}</h3>
        </Link>
        
        <div className="avaliacao">
          <span className="estrelas">★★★★☆</span> 
          <span className="nota">{produto.rating}</span>
        </div>
        
        <div className="preco-container">
           <span className="preco-original">R$ {precoOriginal}</span>
           <span className="preco-atual">R$ {produto.price.toFixed(2)}</span>
        </div>

        {/* O botão "Adicionar" com proteção para não ativar o Link */}
        <button 
          className="btn-adicionar" 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(produto);
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}