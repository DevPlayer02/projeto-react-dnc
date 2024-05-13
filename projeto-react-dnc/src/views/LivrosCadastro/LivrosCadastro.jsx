import {useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService.js'

const LivrosCadastro = () => {
  
  const [livro, setLivro] = useState({
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  async function createLivro(event) {
    event.preventDefault();
    const body = {
      id: uuidv4(),
      titulo: livro.titulo,
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora
    }
  
    try {
      const response = await LivrosService.createLivro(body);
      if (response.data) {
        alert(response.data);
        document.getElementById('formulario').reset();
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
    <Header/>    
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>          
          <form method='POST' id="formulario">
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" id='titulo' required onChange={(event)=>{ setLivro({...livro, titulo: event.target.value})}}></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" id='num' required onChange={(event)=>{ setLivro({...livro, num_paginas: event.target.value})}}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(event)=>{ setLivro({...livro, isbn: event.target.value})}}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(event)=>{ setLivro({...livro, editora: event.target.value})}}></input>
            </div> 
            <div className='form-group'>
              <button onClick={()=>{
                createLivro()
              }}>Cadastrar Livro</button>  
            </div>         
          </form>
        </div>
    </div>
  </>)
  
}

export default LivrosCadastro