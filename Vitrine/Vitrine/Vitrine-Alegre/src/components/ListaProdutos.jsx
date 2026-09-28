import React from 'react';
import CardProduto from './CardProduto';
import './ListaProdutos.css'; // Crie este arquivo

export default function ListaProdutos({ produtos, carregando, erro, onAddToCart }) {
  if (carregando) {
    return (
      <div className="lista-produtos skeleton-grid">
         {/* Renderize cartões fantasmas (skeletons) aqui, conforme mockup "04-estados-da-interface.png" */}
         <div className="skeleton-card"></div>
         <div className="skeleton-card"></div>
         <div className="skeleton-card"></div>
         <div className="skeleton-card"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="estado-erro">
        <div className="icone-erro">!</div>
        <h2>Não foi possível carregar os produtos</h2>
        <p>Verifique sua conexão e tente de novo.</p>
        <button className="btn-tentar-novamente">Tentar novamente</button>
      </div>
    );
  }

  if (produtos.length === 0) {
      return(
          <div className="estado-vazio">
              {/* Implementar mockup de busca sem resultados */}
              <h2>Nenhum produto encontrado</h2>
          </div>
      )
  }

  return (
    <div className="lista-produtos">
      {produtos.map(produto => (
        <CardProduto key={produto.id} produto={produto} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}