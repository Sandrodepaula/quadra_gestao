import React from 'react';
import './App.css';
import Calendario from './pages/Calendario';

// === Dados Fictícios ===
const reservations = [
  { time: '16:00 - 17:00', quadra: 'Quadra 1', cliente: 'Carlos Silva', esporte: 'Futsal', status: 'Confirmado' },
  { time: '17:00 - 18:00', quadra: 'Quadra 2', cliente: 'Ana Souza', esporte: 'Tênis', status: 'Pendente' },
  { time: '18:00 - 19:00', quadra: 'Quadra 1', cliente: 'Carlos Silva', esporte: 'Futsal', status: 'Confirmado' },
  { time: '18:00 - 19:00', quadra: 'Quadra 2', cliente: 'Roctuelle', esporte: 'Tênis', status: 'Confirmado' },
];


// === Componentes Auxiliares ===

const StatusBadge = ({ status }) => {
  const statusClass = status === 'Confirmado' ? 'confirmado' : 'pendente';
  return <div className={`status-badge ${statusClass}`}>{status}</div>;
};

// === Componente Principal ===

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">⚽️</span> Quadra Gestão
        </div>

        <div className="user-profile">
          Olá, Bruno R.
          <div className="avatar">
            <span>BR</span>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">🏠</span> Home
          </a>
          <a href="#" className="sidebar-item active">
            <span className="sidebar-icon">📊</span> Dashboard
          </a>
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">📝</span> Reservas
          </a>
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">🗓️</span> Calendário
          </a>
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">👥</span> Clientes
          </a>
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">📈</span> Relatórios
          </a>
          <a href="#" className="sidebar-item">
            <span className="sidebar-icon">🚪</span> Sair
          </a>

          <div className="search-box">
            <div className="search-title">Buscar Reserva</div>
            <div className="input-group">
              <label className="input-label">Data</label>
              <input type="text" defaultValue="25/Out/2023" className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label">Quadra</label>
              <input type="text" defaultValue="Futsal" className="input-field" />
            </div>
            <div className="input-group">
              <label className="input-label">Cliente</label>
              <input type="text" className="input-field" />
            </div>
          </div>
        </aside>

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
          <Calendario/>
        
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        Quadra Gestão © 2026 | Politicas | Suporte
      </footer>
    </div>
  );
}

export default App;