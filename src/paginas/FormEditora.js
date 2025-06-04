import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TituloCadastro from "../componentes/TituloCadastro";

export default function FormEditora() {
    const navegacao = useNavigate();
    const { id } = useParams();

    //Declarar um useState para cada campo da tabela
    const [nomeeditora, setNomeEditora] = useState('');

    const voltar = () => {
        navegacao('/listaeditora');
    };

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:4000/autor/${id}`);
        //carregar cada campo na sua respectiva variável
        setNomeEditora(data.nomeeditora);
    }

    const alterar = async () => {
        //montar o json do body com todos os campos que precisam ser enviados
        let body = {
            "setNomeEditora": nomeeditora
        };

        await axios.put(`http://localhost:4000/autor/${id}`, body);
        voltar();
    }

    const inserir = async () => {
        let body = {
            "setNomeEditora": nomeeditora
        };

        await axios.post(`http://localhost:4000/autor`, body);
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
        await axios.delete(`http://localhost:4000/autor/${id}`);
        voltar();
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, []);

    return (
        <>
            <TituloCadastro id={id} titulo="editora" />

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
                        Nome da Editora
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={nomeeditora}
                        onChange={(evento) => setNomeEditora(evento.target.value)}
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