export default function CTA() {
  return (
    <section className="cta container">
      <div className="cta-box">
        <h2>Pronto para proteger quem você ama?</h2>
        <p>
          Faça uma simulação rápida e descubra o plano ideal para você e sua
          família.
        </p>
        <a
          href="https://api.whatsapp.com/send?phone=5511957943523&text=Olá%20SafeLife%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20seguros%20de%20vida."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-white" 
          style={{ display: 'center', textDecoration: 'none' }}
        >
          Quero contratar agora <span>→</span>
        </a>
      </div>
    </section>
  )
}
