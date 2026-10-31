import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Reserva, Cliente } from '../types';

type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusClass = status === 'Confirmado' ? 'confirmado' : 'pendente';
  return <div className={`status-badge ${statusClass}`}>{status}</div>;
};

type ReservaApi = {
  id: number;
  hora_inicio?: string;
  hora?: string;
  quadra_id?: number;
  cliente_id?: number;
  esporte?: string;
  status?: string;
};

function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const dataHoje = new Date().toLocaleDateString('pt-BR');
  const diaSemana = new Date().toLocaleDateString('pt-BR', {weekday: 'long'});

  // Função para normalizar o status da reserva
  const normalizarStatus = (status?: string) => {
    if (!status) return 'Pendente';
    const statusNormalizado = status.toLowerCase();
    if (statusNormalizado === 'confirmado' || statusNormalizado === 'confirmada') {
      return 'Confirmado';
    }
    if (statusNormalizado === 'cancelado' || statusNormalizado === 'cancelada') {
      return 'Cancelado';
    }
    return 'Pendente';
  };

  useEffect(() => {
    async function carregarReservas() {
      try {
        const [reservasResponse, clientesResponse] = await Promise.all([
          api.get<ReservaApi[]>('/reservas'),
          api.get<Cliente[]>('/clientes'),
        ]);
        const reservasMapeadas = reservasResponse.data.map((reserva) => ({
          id: reserva.id,
          hora: reserva.hora_inicio || reserva.hora || '—',// Verifica se hora_inicio existe, caso contrário, utiliza hora ou '—' como fallback
          quadra: reserva.quadra_id ? `Quadra ${reserva.quadra_id}` : 'Não informada',
          cliente: reserva.cliente_id
            ? clientesResponse.data.find((cliente) => cliente.id === reserva.cliente_id)?.nome || 'Cliente não encontrado'
            : 'Não informado',
          esporte: reserva.esporte || 'Não informado',
          status: normalizarStatus(reserva.status),
        }));

        setReservas(reservasMapeadas);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        setErro('Não foi possível carregar as reservas.');
      } finally {
        setCarregando(false);
      }
    }

    carregarReservas();
  }, []);

    return (
        <div className="reservas-page"> 
 {/* Content */}
        <main className="content"> 
          <div className="content-header">
            <div>
              <div className="breadcrumb">Painel de Controle / Gestão de Reservas</div>
              <div className="page-title">Painel de Controle / Gestão de Reservas</div>
            </div>
            <Button className="add-button" onClick={() => navigate('/reservas/nova')}>
              + Nova Reserva
            </Button>
          </div>

          {/* Reservas de Hoje */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Reservas de Hoje</div>
                <div className="card-subtitle">{dataHoje}</div>
              </div>
              <div className="date-switcher">
                <span className="date-arrow">{'<'}</span>
                <span>{diaSemana}</span>
                <span className="date-arrow">{'>'}</span>
              </div>
            </div>
            <table className="reservations-table">
              <thead>
                <tr>
                  <th className="table-header-cell">Hora</th>
                  <th className="table-header-cell">Quadra</th>
                  <th className="table-header-cell">Cliente</th>
                  <th className="table-header-cell">Sport</th>
                  <th className="table-header-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (

                  <tr>
                    <td colSpan={5}>Carregando reservas...</td>
                  </tr>
                ) : erro ? (
                  <tr>
                    <td colSpan={5}>{erro}</td>
                  </tr>
                ) : reservas.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>Nenhuma reserva encontrada.</td>
                                </tr>
                            ) : (
                                reservas.map((reserva) => (
                                  <tr key={reserva.id} className="table-row">
                                    <td className="table-cell">
                                      <div className="time-badge">{reserva.hora}</div>
                                    </td>
                                    <td className="table-cell">
                                      <div className="quadra-badge">{reserva.quadra}</div>
                                    </td>
                                    <td className="table-cell">
                                      {reserva.cliente}
                                    </td>
                                    <td className="table-cell">{reserva.esporte}</td>
                                    <td className="table-cell"><StatusBadge status={reserva.status} /></td>
                                  </tr>
                                ))
                              )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
}

export default Reservas;