const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
const port = 3000;


const Livro = mongoose.model('Livro', {
    titulo: String,
    numeroPaginas: Number,
    codigoISBN: String,
    editora: String
});

mongoose.connect('mongodb+srv://contatogiovanicf:bh4NrBS4sQ0BN2aD@cluster0.cafds35.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
        module.exports = app;
        app.listen(port, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

    app.get("/", async (req, res) => {
        return res.send("Servidor rodando");
    });
    
    app.get("/livros", async (req, res, next) => {
        try {
            const livros = await Livro.find()
            return res.send(livros);
        } catch (error) {
            next(error);
        }
    });   
    
    app.delete("/delete/:_id", async (req, res, next) => {
        try {
            const { _id } = req.params;    
            const livro = await Livro.findByIdAndDelete(_id);
            if (livro) {
                res.status(200).json({ mensagem: 'Livro deletado com sucesso!' });
            } else {
                return res.status(404).json({ message: 'Livro não encontrado' });
            }
        } catch (error) {
            next(error);
        }
    });

    app.put('/livros/edicao/:_id', async (req, res, next) => {
        try {
            const { _id } = req.params;
            const livro = req.body;
            const livroAtualizado = await Livro.findByIdAndUpdate(_id, livro, { new: true });
            if (livroAtualizado) {
                res.status(200).json({ mensagem: 'Livro editado com sucesso!' });
            } else {
                res.status(404).json({ mensagem: 'Livro não encontrado' });
            }
        } catch (error) {
            next(error);
        }
    });
    
    app.post("/livros/cadastro", async (req, res, next) => {
        try {
            const livro = new Livro({
                titulo: req.body.titulo,
                numeroPaginas: req.body.numeroPaginas,
                codigoISBN: req.body.codigoISBN,
                editora: req.body.editora
            })
            await livro.save();
            return res.send(livro);
        } catch (error) {
            next(error);
        }
    });
