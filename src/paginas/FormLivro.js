import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormLivro() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [titulolivro, setTituloLivro] = useState('');
    const [anolivro, setAnoLivro] = useState('');
    const [categorialivro, setCategoriaLivro] = useState('');
    const [paginalivro, setPaginaLivro] = useState('');
    const [editoralivro, setEditoraLivro] = useState('');
    const [edicaolivro, setEdicaoLivro] = useState('');
    const [resumolivro, setResumoLivro] = useState('');


    const voltar = () => {
        navegacao('/listalivro');
    };

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro/${id}`);
            setTituloLivro(data.titulolivro);
            setAnoLivro(data.anolivro);
            setCategoriaLivro(data.categorialivro);
            setPaginaLivro(data.paginalivro);
            setEditoraLivro(data.editoralivro);
            setEdicaoLivro(data.edicaolivro);
            setResumoLivro(data.resumolivro);
    };

    const alterar = async () => {
        let body = {
            titulolivro,
            anolivro,
            categorialivro,
            paginalivro,
            editorialivro,
            edicaolivro,
            resumolivro
        };

        await axios.put(`http://localhost:4000/livro/${id}`, body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            titulolivro,
            anolivro,
            categorialivro,
            paginalivro,
            editorialivro,
            edicaolivro,
            resumolivro
        };

        await axios.post(`http://localhost:4000/livro`, body);
        voltar();
    }

    const salvar = async () => {
        if (id) {
            alterar();
        }
        else {
            inserir();
        }
    }

    const excluir = async () => {
        await axios.delete(`http://localhost:4000/livro/${id}`);
        voltar();
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    return (
        <>
            <TituloCadastro id={id} titulo="livro" />

            <form>
                {id && (
                    <div className="mb-3">
                        <label className="form-label">
                            Código
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={id}
                        />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">
                        Título do livro
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulolivro}
                        onChange={(evento) => setTituloLivro(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Ano de publicação
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={anolivro}
                        onChange={(evento) => setAnoLivro(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Categoria
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={categorialivro}
                        onChange={(evento) => setCategoriaLivro(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Número de páginas
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={paginalivro}
                        onChange={(evento) => setPaginaLivro(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Editora
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={editoralivro}
                        onChange={(evento) => setEditoraLivro(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Número de edição
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={edicaolivro}
                        onChange={(evento) => setEdicaoLivro(evento.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Resumo do livro
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={resumolivro}
                        onChange={(evento) => setResumoLivro(evento.target.value)}
                    />
                </div>

                <button type="button" className="btn btn-primary"
                    onClick={() => salvar()}>
                    Salvar
                </button>
                <button type="button"
                    className="btn btn-secondary"
                    onClick={() => voltar()}>
                    Cancelar
                </button>
                {id && (
                    <button type="button"
                        className="btn btn-danger"
                        onClick={() => excluir()}>
                        Excluir
                    </button>
                )}
            </form>
        </>
    );
};