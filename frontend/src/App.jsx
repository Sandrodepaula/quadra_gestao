import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Clientes from './pages/Clientes';
import Calendario from './pages/Calendario';
import Reservas from './pages/Reservas';
import NovoCliente from './pages/NovoCliente';

// === Componente Principal ===

function App() {
  return (
    <Router>
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
            <Link to="/" className="sidebar-item">
              <span className="sidebar-icon">🏠</span> Home
            </Link>
            <Link to="/dashboard" className="sidebar-item">
              <span className="sidebar-icon">📊</span> Dashboard
            </Link>
            <Link to="/reservas" className="sidebar-item">
              <span className="sidebar-icon">📝</span> Reservas
            </Link>
            <Link to="/calendario" className="sidebar-item">
              <span className="sidebar-icon">🗓️</span> Calendário
            </Link>
            <Link to="/clientes" className="sidebar-item">
              <span className="sidebar-icon">👥</span> Clientes
            </Link>

            <Link to="/relatorios" className="sidebar-item">
              <span className="sidebar-icon">📈</span> Relatórios
            </Link>
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

          {/* Routes */}
          <Routes>
            <Route path="/" element={<div><h1>Home</h1></div>} />
            <Route path="/dashboard" element={<div><h1>Dashboard</h1></div>} />
            <Route path="/reservas" element={<Reservas />}/>
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/novo" element={<NovoCliente />} />
            <Route path="/relatorios" element={<div><h1>Relatórios</h1></div>} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="footer">
          Quadra Gestão © 2026 | Politicas | Suporte
        </footer>
      </div>
    </Router>
  );
}

export default App;