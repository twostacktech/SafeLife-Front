import { Heart, Stethoscope, Gift, Pill, Home, Flower2 } from 'lucide-react';

export default function Benefits() {
  const cards = [
    { icon: <Heart color="#d30018"/>, title: "Indenização garantida", text: "Tranquilidade financeira para sua família em qualquer momento da vida." },
    { icon: <Stethoscope color="#d30018"/>, title: "Médico na tela", text: "Atendimento médico por vídeo 24 horas, sem sair de casa."},
    { icon: <Gift color="#d30018"/>, title: "Clube de vantagens", text: "Descontos exclusivos em lojas, restaurantes e serviços parceiros." },
    { icon: <Pill color="#d30018"/>, title: "Desconto em farmácias", text: "Até 70% de desconto em milhares de medicamentos pelo Brasil." },
    { icon: <Home color="#d30018"/>, title: "Assistência residencial", text: "Encanador, eletricista e chaveiro quando você precisar." },
    { icon: <Flower2 color="#d30018"/>, title: "Assistência funeral", text: "Suporte completo nos momentos mais delicados da família." },
  ];

  return (
    <section id="beneficios" className="benefits">
      <div className="container">
        <div className="benefits-header">
          <span className="subtitle-red">BENEFÍCIOS</span>
          <h2>Muito além da indenização</h2>
          <p>Aproveite vantagens exclusivas em vida — porque cuidar de você começa hoje.</p>
        </div>
        
        <div className="benefits-grid">
          {cards.map((card, index) => (
            <div className="benefit-card" key={index}>
              <div className={`icon-box`}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}