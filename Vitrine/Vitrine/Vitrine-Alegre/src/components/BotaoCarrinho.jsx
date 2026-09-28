import React from 'react';
import './BotaoCarrinho.css'; // Crie este arquivo

export default function BotaoCarrinho({ cartCount }) {
  return (
    <button className="botao-carrinho">
      <span className="icone-carrinho">🛒</span>
      Carrinho
      {cartCount > 0 && <span className="badge-carrinho">{cartCount}</span>}
    </button>
  );
}