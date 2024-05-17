import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { LivrosService } from '../../api/LivrosService.js';
import { useParams } from 'react-router-dom';

const LivrosEdicao = () => {
  const { _id } = useParams();

  const [livro, setLivro] = useState({
    _id: '',
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  useEffect(() => {
    if (_id) {
      getLivro(_id);
    }
  }, [_id]);

  async function getLivro(_id) {
    try {
      const { data } = await LivrosService.getLivros(_id);
      setLivro(data);
    } catch (error) {
      alert('Erro ao carregar os dados do livro.');
    }
  }

  async function editLivro(event) {
    event.preventDefault();
    if (livro.titulo && livro.num_paginas && livro.isbn && livro.editora) {
      const body = {
        titulo: livro.titulo,
        num_paginas: Number(livro.num_paginas),
        isbn: livro.isbn,
        editora: livro.editora
      };
      try {
        await LivrosService.updateLivro(livro._id, body);
        alert("Livro atualizado com sucesso.");
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;
          alert(`${status} - ${data.mensagem}`);
        } else {
          alert('Erro ao atualizar o livro.');
        }
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }

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
