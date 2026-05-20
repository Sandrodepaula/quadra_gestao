import React from 'react';

 
 
 // === Dados Fictícios ===
const reservations = [
  { time: '16:00 - 17:00', quadra: 'Quadra 1', cliente: 'Carlos Silva', esporte: 'Futsal', status: 'Confirmado' },
  { time: '17:00 - 18:00', quadra: 'Quadra 2', cliente: 'Ana Souza', esporte: 'Tênis', status: 'Pendente' },
  { time: '18:00 - 19:00', quadra: 'Quadra 1', cliente: 'Carlos Silva', esporte: 'Futsal', status: 'Confirmado' },
  { time: '18:00 - 19:00', quadra: 'Quadra 2', cliente: 'Roctuelle', esporte: 'Tênis', status: 'Confirmado' },
];

// === Componentes Auxiliares ===

type StatusBadgeProps = {
  status: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusClass = status === 'Confirmado' ? 'confirmado' : 'pendente';
  return <div className={`status-badge ${statusClass}`}>{status}</div>;
};


function Reservas() {
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
                <div className="card-subtitle">Quarta-feira, 25 Out 2023</div>
              </div>
              <div className="date-switcher">
                <span>Quarta-feira</span>
                <span className="date-arrow">{'<'}</span>
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
                {reservations.map((reservation, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell">{reservation.time}</td>
                    <td className="table-cell"><div className="quadra-badge">{reservation.quadra}</div></td>
                    <td className="table-cell">{reservation.cliente}</td>
                    <td className="table-cell">{reservation.esporte}</td>
                    <td className="table-cell"><StatusBadge status={reservation.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
}

export default Reservas;