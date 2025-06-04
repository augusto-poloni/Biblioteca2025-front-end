import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaLivro() {
    //Declarando uma variável useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/livro`);
        console.log(data);
        setDados(data);
    }

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloLista titulo="Livros"
                descricao="Gerencie aqui os livros da biblioteca"
                rota="/cadastrolivro" />


            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Ação</th>
                                <th scope="col">Código</th>
                                <th scope="col">Título do livro</th>
                                <th scope="col">Ano de publicação</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Número de páginas</th>
                                <th scope="col">Editora</th>
                                <th scope="col">Número de edição</th>
                                <th scope="col">Resumo do livro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((d) => (
                                <tr key={d.idlivro}>
                                    <td>
                                    <a className="btn btn-primary" href={`/cadastrolivro/${d.idlivro}`}>Alterar</a>
                                    </td>
                                    <td>{d.idlivro}</td>
                                    <td>{d.titulolivro}</td>
                                    <td>{d.anolivro}</td>
                                    <td>{d.categorialivro}</td>
                                    <td>{d.paginalivro}</td>
                                    <td>{d.editoralivro}</td>
                                    <td>{d.edicaolivro}</td>
                                    <td>{d.resumolivro}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};