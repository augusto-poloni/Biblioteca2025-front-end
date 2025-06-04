import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListaAcervo() {
  const [categorias, setCategorias] = useState([]);
  const [livros, setLivros] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const navegacao = useNavigate();

  const carregarCategorias = async () => {
    const { data } = await axios.get("http://localhost:4000/categoria");
    setCategorias(data);
  };

  const buscarCategoria = async (idcategoria) => {
    const { data } = await axios.get(
      `http://localhost:4000/livro/categoria/${idcategoria}`
    );
    setLivros(data);
    setCategoriaSelecionada(idcategoria);
  };

  const emprestarLivro = (idlivro) => {
    navegacao(`/emprestimo/${idlivro}`);
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div className="container">
      <h2 className="mt-4">Acervo de Livros</h2>

      <div className="mb-4">
        <h5>Escolha uma categoria:</h5>
        {categorias.map((c) => (
          <button
            key={c.idcategoria}
            className="btn btn-outline-primary m-1"
            onClick={() => buscarCategoria(c.idcategoria)}
          >
            {c.nomecategoria}
          </button>
        ))}
      </div>

      {categoriaSelecionada && (
        <div>
          <h5>Livros da Categoria Selecionada:</h5>
          <div className="row">
            {livros.length === 0 ? (
              null
            ) : (
              livros.map((livro) => (
                <div className="col-md-6 mb-3" key={livro.idlivro}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{livro.titulolivro}</h5>
                      <p className="card-text">Ano: {livro.anolivro}</p>
                      <p className="card-text">Páginas: {livro.paginalivro}</p>
                      <p className="card-text">Editora: {livro.editoralivro}</p>
                      <p className="card-text">Edição: {livro.edicaolivro}</p>
                      {livro.disponivel ? (
                        <button
                          className="btn btn-success"
                          onClick={() => emprestarLivro(livro.idlivro)}
                        >
                          Emprestar
                        </button>
                      ) : (
                        <span className="text-danger">Livro emprestado</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
