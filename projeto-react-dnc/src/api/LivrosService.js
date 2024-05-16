import axios from "axios";

const BASE_URL = "http://localhost:3000"

export class LivrosService{
    static getHome(){
        return axios.get(BASE_URL+'/');
    }

    static getLivros(){
        return axios.get(`${BASE_URL}/livros`);
    }

    static createLivro(body){
        return axios.post(`${BASE_URL}/livros/cadastro`,body);
    }

    static updateLivro(_id,body){
        return axios.put(`${BASE_URL}/livros/edicao/${_id}`,body);
    }

    static deleteLivro(_id){
        return axios.delete(`${BASE_URL}/delete/${_id}`);
    }
    
}