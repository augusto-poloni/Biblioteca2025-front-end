import TituloLista from "../componentes/TituloLista";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListaEditora() {
    //Declarando uma variável useState
    const [dados, setDados] = useState([]);

    const listar = async () => {
        let { data } = await axios.get(`http://localhost:4000/autor`);
        setDados(data);
    }

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloLista titulo="Editora"
                descricao="Gerencie aqui as editoras dos livros da biblioteca"
                rota="/cadastroeditora" />


            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome da Editora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((d, i) => (
                                <tr>
                                    <td>
                                        <a className="btn btn-primary"
                                            href={`/cadastroautor/${d.ideditora}`}>Alterar</a>
                                    </td>
                                    <td>
                                        <img className="img-thumbnail"
                                            src={d.foto}
                                            style={{ width: '80px' }} />
                                    </td>
                                    <td>{d.ideditora}</td>
                                    <td>{d.nomeeditora}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};