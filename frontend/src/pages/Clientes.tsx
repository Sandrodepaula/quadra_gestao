import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Cliente } from '../types';


function Clientes() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [formEdicao, setFormEdicao] = useState({ nome: '', telefone: '', email: '' });

    useEffect(() => {
        async function carregarClientes() {
            try {
                const response = await api.get<Cliente[]>('/clientes');
                setClientes(response.data || []);
            } catch (error) {
                console.error('Erro ao carregar clientes:', error);
                setClientes([]);
            } finally {
                setCarregando(false);
            }
        }
        carregarClientes();
    }, []);

    const handleEditar = (cliente: Cliente) => {
        setEditandoId(cliente.id);
        setFormEdicao({
            nome: cliente.nome,
            telefone: cliente.telefone,
            email: cliente.email,
        });
    };

    const handleCancelarEdicao = () => {
        setEditandoId(null);
        setFormEdicao({ nome: '', telefone: '', email: '' });
    };

    const handleSalvarEdicao = async (id: number) => {
        try {
            const response = await api.put<Cliente>(`/clientes/${id}`, formEdicao);
            setClientes((prev) => prev.map((cliente) => (cliente.id === id ? response.data : cliente)));
            setEditandoId(null);
            setFormEdicao({ nome: '', telefone: '', email: '' });
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            alert('Não foi possível atualizar o cliente.');
        }
    };

    const handleDeletar = async (id: number) => {
        const confirmar = window.confirm('Deseja realmente excluir este cliente?');
        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/clientes/${id}`);
            setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            alert('Não foi possível excluir o cliente.');
        }
    };

    const handleNovoCliente = () => {
        navigate('/clientes/novo');
    };

    return (
        <div className="clientes-page">
            <main className="content card-layout">
                <div className="content-header">
                    <div className="title-group">
                        <h1>Clientes</h1>
                    </div>

                    <div className="actions-group">
                        <div className="search-container">
                            <input
                                type="text"
                                id="search"
                                placeholder="Buscar clientes..."
                                aria-label="Buscar clientes"
                            />
                        </div>

                            <Button className='btn-new-client'
                                onClick={handleNovoCliente}>+ Novo cliente
                            </Button>
                        

                    </div>
                </div>

                <div className="table-card">
                    <table className="clientes-table">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Telefone</th>
                                <th>E-mail</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carregando ? (
                                <tr>
                                    <td colSpan={4}>Carregando clientes...</td>
                                </tr>
                            ) : clientes.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>Nenhum cliente cadastrado.</td>
                                </tr>
                            ) : (
                                clientes.map((cliente) => {
                                    const editando = editandoId === cliente.id;

                                    return (
                                        <tr key={cliente.id}>
                                            <td>
                                                {editando ? (
                                                    <input
                                                        className="table-input"
                                                        value={formEdicao.nome}
                                                        onChange={(event) =>
                                                            setFormEdicao((prev) => ({ ...prev, nome: event.target.value }))
                                                        }
                                                    />
                                                ) : (
                                                    cliente.nome
                                                )}
                                            </td>
                                            <td>
                                                {editando ? (
                                                    <input
                                                        className="table-input"
                                                        value={formEdicao.telefone}
                                                        onChange={(event) =>
                                                            setFormEdicao((prev) => ({ ...prev, telefone: event.target.value }))
                                                        }
                                                    />
                                                ) : (
                                                    cliente.telefone
                                                )}
                                            </td>
                                            <td>
                                                {editando ? (
                                                    <input
                                                        className="table-input"
                                                        type="email"
                                                        value={formEdicao.email}
                                                        onChange={(event) =>
                                                            setFormEdicao((prev) => ({ ...prev, email: event.target.value }))
                                                        }
                                                    />
                                                ) : (
                                                    cliente.email
                                                )}
                                            </td>
                                            <td>
                                                <div className="action-cell">
                                                    {editando ? (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                className="action-button save-button"
                                                                onClick={() => handleSalvarEdicao(cliente.id)}
                                                            >
                                                                Salvar
                                                            </Button>
                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                className="action-button"
                                                                onClick={handleCancelarEdicao}
                                                            >
                                                                Cancelar
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button
                                                                variant="outline-primary"
                                                                size="sm"
                                                                className="action-button edit-button"
                                                                onClick={() => handleEditar(cliente)}
                                                            >
                                                                Editar
                                                            </Button>
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                className="action-button delete-button"
                                                                onClick={() => handleDeletar(cliente.id)}
                                                            >
                                                                Deletar
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="table-footer">
                    <span>{`Mostrando ${clientes.length} cliente${clientes.length === 1 ? '' : 's'}`}</span>
                    <div className="pagination">
                        <button className="page-button">&lt;</button>
                        <button className="page-button active">1</button>
                        <button className="page-button">2</button>
                        <button className="page-button">3</button>
                        <button className="page-button dots">...</button>
                        <button className="page-button">6</button>
                        <button className="page-button">&gt;</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Clientes;