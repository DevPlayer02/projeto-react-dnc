import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { LivrosService } from '../../api/LivrosService.js';

const LivrosEdicao = () => {
  let { livros_id } = useParams();

  const [livro, setLivro] = useState({});

  async function getLivros() {
    const { data } = await LivrosService.getLivros(livros_id);
    setLivro(data);
  }

  async function editLivro() {
    const body = {
      id: Number(livro._id),
      titulo: livro.titulo,
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora
    };
    if (livro._id != undefined && livro._id != '' && livro.titulo != undefined && livro.titulo != '' && livro.num_paginas != undefined && livro.num_paginas != '' && livro.isbn != undefined && livro.isbn != '' && livro.editora != undefined && livro.editora != '') {
      await LivrosService.updateLivro(Number(livro._id), body)
        .then(({ data }) => {
          alert(data.mensagem);
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data}`);
        });
    }

  }

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <>
      <Header />
      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" required onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }) }} value={livro.titulo || ''} ></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" required onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value }) }} value={livro.num_paginas || ''}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" required onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }} value={livro.isbn || ''}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" required onChange={(event) => { setLivro({ ...livro, editora: event.target.value }) }} value={livro.editora || ''}></input>
            </div>
            <div className='form-group'>
              <button type="submit"  onSubmit={(event) => {
            event.preventDefault();
            editLivro();
          }}>Atualizar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )

}

export default LivrosEdicao;
