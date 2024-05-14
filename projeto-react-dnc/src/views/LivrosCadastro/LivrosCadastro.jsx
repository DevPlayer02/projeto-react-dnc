import { useState } from 'react';
import "./index.scss"
import Header from '../../components/Header/Header';
import { LivrosService } from '../../api/LivrosService.js';
import { v4 as uuidv4 } from 'uuid';


const LivrosCadastro = () => {

  const [livro, setLivro] = useState({
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  async function createLivro(event) {
    event.preventDefault();
    try {
      const id = uuidv4(); 
      const body = {
        id,
        titulo: livro.titulo,
        num_paginas: Number(livro.num_paginas),
        isbn: livro.isbn,
        editora: livro.editora
      };
      const response = await LivrosService.createLivro(body);
      if (response.data) {
        alert("Livro cadastrado com sucesso! ", response.data);
        setLivro({
          titulo: '',
          num_paginas: '',
          isbn: '',
          editora: ''
        });
      } else {
        console.error('Resposta inválida:', response);
      }
    } catch (error) {
      alert('Erro ao cadastrar livro');
      console.error('Erro ao cadastrar livro:', error);
    }
  }

  return (
    <>
      <Header />
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario" onSubmit={createLivro}>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" id='titulo' required onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }) }} value={livro.titulo}></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" id='num' required onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value }) }} value={livro.num_paginas}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }} value={livro.isbn}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(event) => { setLivro({ ...livro, editora: event.target.value }) }} value={livro.editora}></input>
            </div>
            <div className='form-group'>
              <button type="submit">Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )

}

export default LivrosCadastro;