import { Shield, ArrowLeft } from 'lucide-react';

export default function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <div className="admin-container">
        
        <div className="admin-logo">
          <div className="admin-logo-box">
            <Shield size={20} color="#fff" fill="#fff" />
          </div>
          <strong>SafeLife</strong>
        </div>

        <ul className="admin-links">
          <li><a href="#clientes">Clientes</a></li>
          <li><a href="#apolices">Apólices</a></li>
          <li><a href="#relatorios">Relatórios</a></li>
        </ul>

        <button className="btn-voltar">
          <ArrowLeft size={18} /> Voltar
        </button>
        
      </div>
    </nav>
  );
}