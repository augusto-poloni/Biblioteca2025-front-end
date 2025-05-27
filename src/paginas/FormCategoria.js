import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FormCategoria() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [nomecategoria, setNomeCategoria] = useState('');

    const voltar = () => {
        navegacao('/listacategoria');
    };

    const excluir = async () => {
        await axios.delete(`http://localhost:4000/categoria/${id}`);
        voltar();
    }

    return (
        <>
            <h1>Cadastros de categoria</h1>

            <form>
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
                <div className="mb-3">
                    <label className="form-label">
                        Nome da categoria
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={nomecategoria}
                        onChange={(evento) => setNomeCategoria(evento.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary">
                    Salvar
                </button>
                <button type="button"
                    className="btn btn-secondary"
                    onClick={() => voltar()}>
                    Cancelar
                </button>
                <button type="button"
                    className="btn btn-danger"
                    onClick={() => excluir()}>
                    Excluir
                </button>
            </form>
        </>
    );
};