import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetalheProduto.css'; 

export default function DetalheProduto({ onAddToCart }) {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemAtiva, setImagemAtiva] = useState('');

  useEffect(() => {
    setCarregando(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduto(data);
        setImagemAtiva(data.thumbnail); 
        setCarregando(false);
      })
      .catch(err => {
        console.error("Erro ao buscar produto:", err);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) return <div className="estado-carregando">A carregar detalhes do produto...</div>;
  if (!produto) return <div className="estado-erro">Produto não encontrado.</div>;

  const precoOriginal = (produto.price / (1 - produto.discountPercentage / 100)).toFixed(2);
  const economia = (precoOriginal - produto.price).toFixed(2);
  const parcela = (produto.price / 12).toFixed(2);

  return (
    <div className="pagina-detalhe">
      <nav className="breadcrumbs">
        <Link to="/">Início</Link> &rsaquo; <span>{produto.category}</span> &rsaquo; <strong>{produto.title}</strong>
      </nav>

      <div className="detalhe-container principal">
        <div className="galeria-imagens">
          <div className="imagem-principal-container">
            <img src={imagemAtiva} alt={produto.title} className="imagem-principal" />
          </div>
          <div className="lista-miniaturas">
            {produto.images && produto.images.slice(0, 4).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Miniatura ${index + 1}`} 
                className={`miniatura ${imagemAtiva === img ? 'ativa' : ''}`}
                onClick={() => setImagemAtiva(img)}
              />
            ))}
          </div>
        </div>

        <div className="info-compra">
          <span className="categoria-texto">{produto.category.toUpperCase()}</span>
          <h1 className="titulo-produto">{produto.title}</h1>
          <p className="meta-info">Marca: {produto.brand || 'Genérica'} · SKU: {produto.sku}</p>
          
          <div className="avaliacao-detalhe">
            <span className="estrelas">★★★★☆</span>
            <span>{produto.rating} · {produto.reviews?.length || 0} avaliações</span>
          </div>

          <div className="caixa-preco">
            <p className="preco-antigo">R$ {precoOriginal} <span className="economia">economize R$ {economia}</span></p>
            <div className="preco-atual-container">
              <h2 className="preco-atual">R$ {produto.price.toFixed(2)}</h2>
              <span className="badge-desconto">-{Math.round(produto.discountPercentage)}%</span>
            </div>
            <p className="parcelamento">em até 12x de R$ {parcela} sem juros</p>
          </div>

          <p className={`estoque ${produto.stock > 0 ? 'em-estoque' : 'sem-estoque'}`}>
            ● {produto.stock} em estoque
          </p>

          <div className="acoes-compra">
            <div className="seletor-quantidade">
              <button>-</button>
              <input type="text" value="1" readOnly />
              <button>+</button>
            </div>
            <button className="btn-adicionar-grande" onClick={() => onAddToCart(produto)}>
              Adicionar ao carrinho
            </button>
          </div>

          <div className="beneficios">
            <div className="beneficio-card">
              <small>ENVIO</small>
              <p>{produto.shippingInformation}</p>
            </div>
            <div className="beneficio-card">
              <small>GARANTIA</small>
              <p>{produto.warrantyInformation}</p>
            </div>
            <div className="beneficio-card">
              <small>DEVOLUÇÃO</small>
              <p>{produto.returnPolicy}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="detalhe-container grid-inferior">
        <div className="secao-detalhe">
          <h3>Descrição</h3>
          <p>{produto.description}</p>
        </div>

        <div className="secao-detalhe">
          <h3>Especificações</h3>
          <ul className="lista-especificacoes">
            <li><span>Peso</span> <strong>{produto.weight} kg</strong></li>
            <li><span>Estoque</span> <strong>{produto.stock} unidades</strong></li>
            <li><span>Pedido mínimo</span> <strong>{produto.minimumOrderQuantity} unidades</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}