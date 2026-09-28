import React, { useState, useEffect } from 'react';
import ListaProdutos from '../components/ListaProdutos';
import FiltroCategorias from '../components/FiltroCategorias';
import Paginacao from '../components/Paginacao'; 

export default function Home({ onAddToCart, termoBusca }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  useEffect(() => {
    setCarregando(true);
    fetch('https://dummyjson.com/products?limit=100') 
      .then(res => {
          if(!res.ok) throw new Error("Erro na rede");
          return res.json();
      })
      .then(data => {
        setProdutos(data.products);
        setCarregando(false);
      })
      .catch(err => {
        console.error(err);
        setErro(true);
        setCarregando(false);
      });
  }, []);

  const produtosFiltrados = produtos.filter(produto => {
    const matchCategoria = categoriaAtiva === 'Todas' || produto.category === categoriaAtiva;
    const matchBusca = produto.title.toLowerCase().includes((termoBusca || '').toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <div className="home-page">
      <FiltroCategorias 
        categoriaAtiva={categoriaAtiva} 
        setCategoriaAtiva={setCategoriaAtiva} 
      />
      
      <div className="info-resultados" style={{ margin: '15px 0', color: '#666', fontSize: '0.9rem' }}>
         <p><strong style={{ color: '#333' }}>{produtosFiltrados.length} produtos</strong> encontrados</p> 
      </div>
      
      <ListaProdutos 
        produtos={produtosFiltrados} 
        carregando={carregando} 
        erro={erro} 
        onAddToCart={onAddToCart} 
      />

      <Paginacao />
    </div>
  );
}