const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
const port = 3000;


const Livro = mongoose.model('Livro', {
    _id: {
        type: String,
        default: uuidv4
    },
    titulo: String,
    numeroPaginas: Number,
    codigoISBN: String,
    editora: String
});

mongoose.connect('mongodb+srv://contatogiovanicf:sz3UPZlsePytcrFR@cluster0.cafds35.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
    
    
    app.delete("/delete/:id", async (req, res, next) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).send("ID inválido");
            }
            
            const livro = await Livro.findByIdAndDelete(req.params.id)
            return res.send(livro)
        } catch (error) {
            next(error);
        }
    });

    app.put("/update/:id", async (req, res, next) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).send("ID inválido");
            }
            
            const livro = await Livro.findByIdAndUpdate(req.params.id, {
                titulo: req.body.titulo,
                numeroPaginas: req.body.numeroPaginas,
                codigoISBN: req.body.codigoISBN,
                editora: req.body.editora
            }, {
                new: true
            })
        
            return res.send(livro)
        } catch (error) {
            next(error);
        }
    })
    
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
