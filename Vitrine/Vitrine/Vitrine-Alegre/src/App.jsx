import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import Home from './pages/Home';
import DetalheProduto from './pages/DetalheProduto';
import Carrinho from './pages/Carrinho';
import './App.css';

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const existe = prev.find(item => item.id === produto.id);
      if (existe) {
        return prev.map(item => 
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const alterarQuantidade = (id, delta) => {
    setCarrinho((prev) => prev.map(item => {
      if (item.id === id) {
        const novaQuantidade = item.quantidade + delta;
        return { ...item, quantidade: novaQuantidade > 0 ? novaQuantidade : 1 };
      }
      return item;
    }));
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter(item => item.id !== id));
  };

  const totalUnidades = carrinho.reduce((total, item) => total + item.quantidade, 0);

  return (
    <div className="app-container">
      <Cabecalho cartCount={totalUnidades} onBusca={setTermoBusca} />
      
      <main className="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home onAddToCart={adicionarAoCarrinho} termoBusca={termoBusca} />} />
          <Route path="/produto/:id" element={<DetalheProduto onAddToCart={adicionarAoCarrinho} />} />
          <Route path="/carrinho" element={
            <Carrinho 
              carrinho={carrinho} 
              onAlterarQuantidade={alterarQuantidade}
              onRemover={removerDoCarrinho}
            />
          } />
        </Routes>
      </main>

      <Rodape />
    </div>
  );
}