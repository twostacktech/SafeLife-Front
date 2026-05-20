import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo white">
            <Shield size={32} color="#fff" />
            <h2>SafeLife Seguros</h2>
          </div>
          <p>Proteção e benefícios em vida para você e sua família.<br/>SafeLife — cuidando do que importa.</p>
        </div>
        
        <div className="footer-links">
          <div>
            <h3>Contato</h3>
            <ul>
              <li><Phone size={16} color="#d30018" /> 0800 123 4567</li>
              <li><Mail size={16} color="#d30018" /> contato@safelife.com.br</li>
              <li><MapPin size={16} color="#d30018" /> São Paulo, SP</li>
            </ul>
          </div>
          <div>
            <h3>Institucional</h3>
            <ul>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Termos de Uso</a></li>
              <li><a href="#">Área do Administrador</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 SafeLife Seguros. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}