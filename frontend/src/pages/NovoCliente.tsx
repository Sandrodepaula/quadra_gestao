import Button from 'react-bootstrap/Button';
import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../services/api';
import { Cliente } from '../types';



function NovoCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [formCliente, setFormCliente] = useState({'id': 0, 'nome': '', 'email': '', 'telefone': ''});
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  useEffect(() => {
    if (!mensagemSucesso) {
      return;
    }

    const timeoutId = window.setTimeout(() => setMensagemSucesso(''), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [mensagemSucesso]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensagemSucesso('');

    const telefoneCadastrado = clientes.some(cliente => cliente.telefone === formCliente.telefone);
    if (telefoneCadastrado) {
      alert('Telefone já cadastrado. Por favor, insira um telefone diferente.');
      return;
    }

    try {
      const response = await api.post<Cliente>('/clientes/novo', formCliente);
      if (response) {
        setClientes((prev) => [...prev, response.data]);
        setFormCliente({ id: 0, nome: '', email: '', telefone: '' });
        setMensagemSucesso('Cliente criado com sucesso!');
      }
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
      {mensagemSucesso && (
        <div className="success-toast" role="status" aria-live="polite">
          {mensagemSucesso}
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
          <Button className="save-button" type="submit">
            Salvar Cliente
          </Button>
        </div>
      </form>
    </div>  

  );


}
export default NovoCliente;