import React from 'react';
import { Link } from 'react-router-dom';
import './Carrinho.css';

export default function Carrinho({ carrinho, onAlterarQuantidade, onRemover }) {
  // Estado Vazio (Mockup 04)
  if (carrinho.length === 0) {
    return (
      <div className="carrinho-vazio">
        <h1 className="titulo-pagina">Seu carrinho</h1>
        <div className="vazio-container">
          <div className="icone-carrinho-vazio">🛒</div>
          <h2>Seu carrinho está vazio</h2>
          <p>Escolha um produto na vitrine para começar.</p>
          <Link to="/">
            <button className="btn-ir-vitrine">Ir para a vitrine</button>
          </Link>
        </div>
      </div>
    );
  }

  // Cálculos do Resumo
  const totalItens = carrinho.length;
  const totalUnidades = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  
  const subtotal = carrinho.reduce((acc, item) => {
    const precoOriginal = item.price / (1 - item.discountPercentage / 100);
    return acc + (precoOriginal * item.quantidade);
  }, 0);

  const total = carrinho.reduce((acc, item) => acc + (item.price * item.quantidade), 0);
  const descontos = subtotal - total;
  const parcela = (total / 12).toFixed(2);

  // Estado Preenchido (Mockup 03)
  return (
    <div className="pagina-carrinho">
      <header className="carrinho-header">
        <div>
          <h1 className="titulo-pagina">Seu carrinho</h1>
          <span className="subtitulo-carrinho">{totalItens} produtos · {totalUnidades} unidades</span>
        </div>
        <Link to="/" className="link-continuar">Continuar comprando &rsaquo;</Link>
      </header>

      <div className="carrinho-layout">
        {/* Lado Esquerdo: Lista de Produtos */}
        <div className="lista-carrinho">
          {carrinho.map(item => (
            <div key={item.id} className="item-carrinho">
              <div className="item-imagem">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              
              <div className="item-info">
                <span className="item-categoria">{item.category.toUpperCase()}</span>
                <Link to={`/produto/${item.id}`} className="item-titulo-link">
                  <h3 className="item-titulo">{item.title}</h3>
                </Link>
                <span className="item-preco-unitario">R$ {item.price.toFixed(2)} cada</span>
              </div>

              <div className="seletor-quantidade">
                <button onClick={() => onAlterarQuantidade(item.id, -1)}>-</button>
                <input type="text" value={item.quantidade} readOnly />
                <button onClick={() => onAlterarQuantidade(item.id, 1)}>+</button>
              </div>

              <div className="item-subtotal">
                R$ {(item.price * item.quantidade).toFixed(2)}
              </div>

              <button className="btn-remover" onClick={() => onRemover(item.id)}>
                &times; {/* Símbolo de X */}
              </button>
            </div>
          ))}
        </div>

        {/* Lado Direito: Resumo do Pedido */}
        <aside className="resumo-pedido">
          <h2>Resumo do pedido</h2>
          
          <div className="linha-resumo">
            <span>Subtotal ({totalUnidades} itens)</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          
          <div className="linha-resumo descontos">
            <span>Descontos</span>
            <span>- R$ {descontos.toFixed(2)}</span>
          </div>
          
          <div className="linha-resumo frete">
            <span>Frete</span>
            <span>Grátis</span>
          </div>

          <hr className="divisor" />

          <div className="linha-total">
            <span>Total</span>
            <div className="valores-total">
              <span className="valor-final">R$ {total.toFixed(2)}</span>
              <span className="parcelamento-final">em 12x de R$ {parcela}</span>
            </div>
          </div>

          <button className="btn-finalizar">
            Finalizar compra
          </button>
        </aside>
      </div>
    </div>
  );
}