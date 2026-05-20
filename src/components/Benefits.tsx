import { Flower2, Gift, Heart, Home, Pill, Stethoscope } from "lucide-react"

export default function Benefits() {
  const cards = [
    {
      icon: <Heart />,
      title: "Indenização garantida",
      text: "Tranquilidade financeira para sua família em qualquer momento da vida.",
    },
    {
      icon: <Stethoscope />,
      title: "Médico na tela",
      text: "Atendimento médico por vídeo 24 horas, sem sair de casa.",
    },
    {
      icon: <Gift />,
      title: "Clube de vantagens",
      text: "Descontos exclusivos em lojas, restaurantes e serviços parceiros.",
    },
    {
      icon: <Pill />,
      title: "Desconto em farmácias",
      text: "Até 70% de desconto em milhares de medicamentos pelo Brasil.",
    },
    {
      icon: <Home />,
      title: "Assistência residencial",
      text: "Encanador, eletricista e chaveiro quando você precisar.",
    },
    {
      icon: <Flower2 />,
      title: "Assistência funeral",
      text: "Suporte completo nos momentos mais delicados da família.",
    },
  ]

  return (
    <section id="beneficios" className="benefits">
      <div className="container">
        <div className="benefits-header">
          <span className="subtitle-red">BENEFÍCIOS</span>
          <h2>Muito além da indenização</h2>
          <p>
            Aproveite vantagens exclusivas em vida, porque cuidar de você
            começa hoje.
          </p>
        </div>

        <div className="benefits-grid">
          {cards.map((card) => (
            <article className="benefit-card" key={card.title}>
              <div className="icon-box">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
