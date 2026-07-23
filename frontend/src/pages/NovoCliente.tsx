import Button from 'react-bootstrap/Button';
import {  useState } from 'react';
import { api } from '../services/api';
import { Cliente } from '../types';



function NovoCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formCliente, setFormCliente] = useState({'id': 0, 'nome': '', 'email': '', 'telefone': ''});

  const handleSubmit = async (cliente: Cliente) => {
    setFormCliente({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone
    });
    const telefoneCadastrado = clientes.some(cliente => cliente.telefone !== formCliente.telefone); 
    if (!telefoneCadastrado) {
      alert('Telefone já cadastrado. Por favor, insira um telefone diferente.');
      return;
    }

    try {
      const response = await api.post<Cliente>('/clientes/novo', formCliente);
      if (response) {
        setClientes((prev) => [...prev, response.data]);
        
        window.alert('Cliente criado com sucesso!');
        
      }
      //setFormCliente({nome: '', email: '', telefone: '' }); // Limpa o formulário após o envio
    } catch (error: any) {
      console.error("Erro ao criar cliente:", error);
      window.alert('Erro ao criar cliente. Por favor, tente novamente.');
    }
  };

  return (
    <div className="form-container card">
      <h1>Novo Cliente</h1>
      <Button className='btn-back' variant="secondary" href="/clientes">
        Voltar
      </Button>
      <form>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={formCliente.nome}
            onChange={(e) => setFormCliente({...formCliente, nome: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formCliente.email}
            onChange={(e) => setFormCliente({...formCliente, email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            value={formCliente.telefone}
            onChange={(e) => setFormCliente({...formCliente, telefone: e.target.value})}
          />
        </div>
        <div className="form-actions">
          <Button className="save-button" type="submit" onClick={() => handleSubmit(formCliente)}>
            Salvar Cliente
          </Button>
        </div>
      </form>
    </div>  

  );


}
export default NovoCliente;