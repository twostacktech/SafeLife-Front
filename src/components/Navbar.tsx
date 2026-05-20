import { Shield, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar container">
      <div className="logo">
        <Shield size={32} color="#d30018" fill="#d30018" />
        <div>
          <strong>SafeLife</strong>
          <span>SEGUROS</span>
        </div>
      </div>
      
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#beneficios">Benefícios</a></li>
        <li><a href="#faq">Dúvidas Frequentes</a></li>
      </ul>

      <button className="btn-outline">
        Área do Administrador <ArrowRight size={16} />
      </button>
    </nav>
  );
}