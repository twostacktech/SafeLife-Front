import { ArrowLeft, ArrowRight, Shield } from "lucide-react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"

const adminRoutes = ["/clientes", "/apolices", "/relatorios"]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAdminArea = adminRoutes.includes(location.pathname)

  const scrollToSection = (sectionId: string) => {
    const scroll = () => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(scroll, 100)
      return
    }

    scroll()
  }

  if (isAdminArea) {
    return (
      <header className="admin-header">
        <nav className="admin-navbar container">
          <Link className="admin-logo" to="/clientes">
            <span className="admin-logo-icon">
              <Shield size={22} />
            </span>
            <strong>SafeLife</strong>
          </Link>

          <ul className="admin-nav-links">
            <li>
              <NavLink to="/clientes">Clientes</NavLink>
            </li>
            <li>
              <NavLink to="/apolices">Apólices</NavLink>
            </li>
            <li>
              <NavLink to="/relatorios">Relatórios</NavLink>
            </li>
          </ul>

          <Link className="admin-back" to="/">
            <ArrowLeft size={16} /> Voltar
          </Link>
        </nav>
      </header>
    )
  }

  return (
    <header className="site-header">
      <nav className="navbar container">
        <button
          className="logo"
          onClick={() => scrollToSection("home")}
          type="button"
          aria-label="Ir para o início"
        >
          <span className="logo-icon">
            <Shield size={26} />
          </span>

          <span>
            <strong>SafeLife</strong>
            <small>SEGUROS</small>
          </span>
        </button>

        <ul className="nav-links">
          <li>
            <button type="button" onClick={() => scrollToSection("home")}>
              Home
            </button>
          </li>
          <li>
            <button type="button" onClick={() => scrollToSection("beneficios")}>
              Benefícios
            </button>
          </li>
          <li>
            <button type="button" onClick={() => scrollToSection("faq")}>
              Dúvidas Frequentes
            </button>
          </li>
        </ul>

        <Link className="btn-outline" to="/clientes">
          Área do Administrador <ArrowRight size={18} />
        </Link>
      </nav>
    </header>
  )
}
