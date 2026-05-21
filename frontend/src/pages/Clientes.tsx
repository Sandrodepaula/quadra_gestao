import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { api } from '../services/api';


function Clientes() {
    const [clientes, setClientes] = useState([]);
    useEffect(() => {
        async function carregarClientes() {
            const response = await api.get('/clientes');
            setClientes(response.data);
        }
        carregarClientes();
    }, []);

    return (
        <div className="clientes-page">
        <main className="content">
            <div className="content-header">
                <h1>Clientes</h1>

                <div className="search-container">
                    <label htmlFor="search">Pesquisar Clientes:</label>
                    <input type="text" id="search" /> 
                </div>

                <Button variant="success">+ Novo Cliente</Button>
            </div>

            <table className="clientes-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Observações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Dados dos clientes serão exibidos aqui */}
                    <tr>
                        <td>John Doe</td>
                        <td>(11) 1234-5678</td>
                        <td>john.doe@example.com</td>
                        <td>Cliente desde 2020</td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>(11) 8765-4321</td>
                        <td>jane.smith@example.com</td>
                        <td>Cliente desde 2019</td>
                    </tr>
                </tbody>
            </table>
        </main>
        </div>
    );
}

export default Clientes;