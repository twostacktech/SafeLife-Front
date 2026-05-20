import heroFamily from "../assets/hero-family.jpg"

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="subtitle">SEGURO DE VIDA</span>
          <h1>Cuide bem do que é importante para você.</h1>
          <p>
            Com o Seguro de Vida da SafeLife, você e sua família podem
            aproveitar todos os momentos com proteção e segurança.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" type="button">
              Faça uma cotação <span>→</span>
            </button>
            <button className="btn-secondary" type="button">
              Saiba mais
            </button>
          </div>
        </div>

        <div className="hero-image-box">
          <img
            src={heroFamily}
            alt="Família feliz na cozinha"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  )
}
