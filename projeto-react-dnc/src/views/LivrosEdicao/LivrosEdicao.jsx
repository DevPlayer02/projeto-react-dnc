import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { LivrosService } from '../../api/LivrosService.js';

const LivrosEdicao = () => {

  const [livro, setLivro] = useState({
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  async function getLivros(_id){
    const {data} = await LivrosService.getLivros(_id);
    setLivro(data)
  }

  async function editLivro(event) {
    event.preventDefault();
  
    if (livro._id && livro.titulo && livro.num_paginas && livro.isbn && livro.editora) {
      const body = {
        titulo: livro.titulo,
        num_paginas: Number(livro.num_paginas),
        isbn: livro.isbn,
        editora: livro.editora
      };
      try {
        await LivrosService.updateLivro(livro._id, body); // Corrigido para usar livro._id
        alert("Livro atualizado com sucesso.");
      } catch (error) {
        const { response: { data, status } } = error;
        alert(`${status} - ${data.mensagem}`);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }

  useEffect(() => {
    getLivros(livro._id);
  }, []);

  return (
    <>
      <Header />
      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario" onSubmit={editLivro}>
            <div className='form-group'>
              <label>Título</label>
              <input
                type="text"
                required
                onChange={(event) => setLivro({ ...livro, titulo: event.target.value })}
                value={livro.titulo || ''}
              />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input
                type="number"
                required
                onChange={(event) => setLivro({ ...livro, num_paginas: event.target.value })}
                value={livro.num_paginas || ''}
              />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(event) => setLivro({ ...livro, isbn: event.target.value })}
                value={livro.isbn || ''}
              />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(event) => setLivro({ ...livro, editora: event.target.value })}
                value={livro.editora || ''}
              />
            </div>
            <div className='form-group'>
              <button type="submit">Atualizar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
