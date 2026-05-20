import { Mail, MapPin, Phone, Shield } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">
              <Shield size={24} />
            </span>
            <h2>SafeLife Seguros</h2>
          </div>
          <p>
            Proteção e benefícios em vida para você e sua família.
            <br />
            SafeLife, cuidando do que importa.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Contato</h3>
            <ul>
              <li>
                <Phone size={18} /> 0800 123 4567
              </li>
              <li>
                <Mail size={18} /> twostacktech@gmail.com
              </li>
              <li>
                <MapPin size={18} /> São Paulo, SP
              </li>
            </ul>
          </div>

          <div>
            <h3>Institucional</h3>
            <ul>
              <li>
                <a href="/">Política de Privacidade</a>
              </li>
              <li>
                <a href="/">Termos de Uso</a>
              </li>
              <li>
                <Link to="/clientes">Área do Administrador</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 SafeLife Seguros. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
