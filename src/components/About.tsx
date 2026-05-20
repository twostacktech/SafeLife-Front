import { CheckCircle2 } from "lucide-react"

export default function About() {
  return (
    <section className="about container">
      <div className="about-title">
        <span className="subtitle-red">SOBRE O PRODUTO</span>
        <h2>O que é o Seguro de Vida?</h2>
      </div>

      <div className="about-content">
        <p>
          O Seguro de Vida é uma segurança financeira para que você possa viver
          com tranquilidade em todas as fases da vida.
        </p>
        <p>
          Ele proporciona uma indenização em dinheiro em situações inesperadas,
          como acidentes que o impeçam de trabalhar ou mesmo em casos de morte.
          Essa indenização pode ser usada para cobrir despesas e manter o
          conforto da sua família.
        </p>

        <ul className="about-list">
          <li>
            <CheckCircle2 size={22} /> Contratação 100% online
          </li>
          <li>
            <CheckCircle2 size={22} /> Sem exames médicos para a maioria dos
            planos
          </li>
          <li>
            <CheckCircle2 size={22} /> Coberturas personalizáveis
          </li>
        </ul>
      </div>
    </section>
  )
}
