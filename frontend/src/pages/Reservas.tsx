import React from 'react';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Reserva, Cliente } from '../types';

// === Componentes Auxiliares ===
// Componente para exibir o status da reserva com cores diferentes
type StatusBadgeProps = {
  status: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusClass = status === 'Confirmado' ? 'confirmado' : 'pendente';
  return <div className={`status-badge ${statusClass}`}>{status}</div>;
};


function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [clientes, setClientes] = useState<Cliente[]>([]);
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

  // === Função para buscar clientes ===
  const buscarClientes = async () => {
    try {
      const response = await api.get<Cliente[]>('/clientes');
      const clientesMapeados = (response.data || []).map((cliente: any) => ({
        id: cliente.id,
        nome: cliente.nome || 'Não informado',
        telefone: cliente.telefone || 'Não informado',
        email: cliente.email || 'Não informado',
      }));
      setClientes(clientesMapeados);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    async function carregarReservas() {
      try {
        const response = await api.get<any[]>('/reservas');
        const reservasMapeadas = (response.data || []).map((reserva: any) => ({
          id: reserva.id,
          hora: reserva.hora_inicio || reserva.hora || '—',// Verifica se hora_inicio existe, caso contrário, utiliza hora ou '—' como fallback
          quadra: reserva.quadra_id ? `Quadra ${reserva.quadra_id}` : 'Não informada',
          cliente: reserva.cliente_id ? (clientes.find((c) => c.id === reserva.cliente_id)?.nome || 'Cliente não encontrado'): 'Não informado',
          esporte: reserva.esporte || 'Não informado',
          status: normalizarStatus(reserva.status),
        }));

        setReservas(reservasMapeadas);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        setReservas([]);
      } finally {
        setCarregando(false);
      }
    }

    carregarReservas();
  }, []);

  useEffect(() => {
    buscarClientes();
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
            <button className="add-button">+ Nova Reserva</button>
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
                    <td colSpan={4}>Carregando reservas...</td>
                  </tr>
                ) : reservas.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>Nenhuma reserva encontrada.</td>
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