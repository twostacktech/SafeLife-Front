export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="subtitle">SEGURO DE VIDA</span>
          <h1>Cuide bem do que é importante para você.</h1>
          <p>Com o Seguro de Vida da SafeLife, você e sua família podem aproveitar todos os momentos com proteção e segurança.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Faça uma cotação &rarr;</button>
            <button className="btn-secondary">Saiba mais</button>
          </div>
        </div>
        <div className="hero-image-box">
          <img src="/src/assets/hero-family.jpg" alt="Família feliz na cozinha" className="hero-img" />
        </div>
      </div>
    </section>
  );
}