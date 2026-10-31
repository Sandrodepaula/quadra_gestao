import { useEffect, useState, type FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Cliente } from '../types';

type FormularioReserva = {
  clienteId: string;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  valor: string;
};

function NovaReserva() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregandoClientes, setCarregandoClientes] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [formReserva, setFormReserva] = useState<FormularioReserva>({
    clienteId: '',
    data: '',
    hora_inicio: '',
    hora_fim: '',
    valor: '',
  });

  useEffect(() => {
    async function carregarClientes() {
      try {
        const response = await api.get<Cliente[]>('/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao carregar clientes para a reserva:', error);
        setErro('Não foi possível carregar os clientes. Tente novamente.');
      } finally {
        setCarregandoClientes(false);
      }
    }

    carregarClientes();
  }, []);

  useEffect(() => {
    if (!mensagemSucesso) {
      return;
    }

    const timeoutId = window.setTimeout(() => setMensagemSucesso(''), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [mensagemSucesso]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro('');
    setMensagemSucesso('');

    if (formReserva.hora_fim <= formReserva.hora_inicio) {
      setErro('O horário de término deve ser posterior ao horário de início.');
      return;
    }

    setSalvando(true);
    try {
      await api.post('/reservas', {
        ...formReserva,
        clienteId: Number(formReserva.clienteId),
        valor: Number(formReserva.valor),
      });
      setFormReserva({
        clienteId: '',
        data: '',
        hora_inicio: '',
        hora_fim: '',
        valor: '',
      });
      setMensagemSucesso('Reserva criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      setErro('Não foi possível criar a reserva. Verifique os dados e tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <main className="form-container card">
      <h1>Nova Reserva</h1>
      <Button className="btn-back" variant="secondary" onClick={() => navigate('/reservas')}>
        Voltar
      </Button>

      {mensagemSucesso && (
        <div className="success-toast" role="status" aria-live="polite">
          {mensagemSucesso}
        </div>
      )}
      {erro && <div className="form-error" role="alert">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cliente">Cliente</label>
          <select
            className="form-control"
            id="cliente"
            value={formReserva.clienteId}
            onChange={(event) => setFormReserva({ ...formReserva, clienteId: event.target.value })}
            required
            disabled={carregandoClientes || clientes.length === 0}
          >
            <option value="">
              {carregandoClientes ? 'Carregando clientes...' : 'Selecione um cliente'}
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
            ))}
          </select>
          {!carregandoClientes && clientes.length === 0 && !erro && (
            <p>Nenhum cliente cadastrado. Cadastre um cliente antes de criar a reserva.</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="data">Data</label>
          <input
            className="form-control"
            type="date"
            id="data"
            value={formReserva.data}
            onChange={(event) => setFormReserva({ ...formReserva, data: event.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hora-inicio">Horário de início</label>
          <input
            className="form-control"
            type="time"
            id="hora-inicio"
            value={formReserva.hora_inicio}
            onChange={(event) => setFormReserva({ ...formReserva, hora_inicio: event.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hora-fim">Horário de término</label>
          <input
            className="form-control"
            type="time"
            id="hora-fim"
            value={formReserva.hora_fim}
            onChange={(event) => setFormReserva({ ...formReserva, hora_fim: event.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor da reserva (R$)</label>
          <input
            className="form-control"
            type="number"
            id="valor"
            min="0"
            step="0.01"
            value={formReserva.valor}
            onChange={(event) => setFormReserva({ ...formReserva, valor: event.target.value })}
            required
          />
        </div>

        <div className="form-actions">
          <Button className="save-button" type="submit" disabled={salvando || carregandoClientes || clientes.length === 0}>
            {salvando ? 'Salvando...' : 'Salvar Reserva'}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default NovaReserva;
