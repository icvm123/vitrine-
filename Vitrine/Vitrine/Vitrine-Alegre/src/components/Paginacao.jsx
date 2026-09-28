import React from 'react';
import './Paginacao.css';

export default function Paginacao() {
  return (
    <div className="paginacao">
      <button className="btn-pagina">&lsaquo;</button>
      <button className="btn-pagina ativo">1</button>
      <button className="btn-pagina">2</button>
      <button className="btn-pagina">3</button>
      <button className="btn-pagina">4</button>
      <span className="reticencias">...</span>
      <button className="btn-pagina">17</button>
      <button className="btn-pagina">&rsaquo;</button>
    </div>
  );
}