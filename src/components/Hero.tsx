import { useEffect, useState } from "react"
import heroFamily from "../assets/hero-family.png"
import heroFamily2 from "../assets/hero-family2.png"
import heroFamily3 from "../assets/hero-family3.png"
import heroFamily4 from "../assets/hero-family4.png"

const heroImages = [
  {
    src: heroFamily,
    alt: "Família feliz na cozinha",
  },
  {
    src: heroFamily2,
    alt: "Família protegida pelo seguro de vida",
  },
  {
    src: heroFamily3,
    alt: "Família aproveitando momentos juntos",
  },
  {
    src: heroFamily4,
    alt: "Família reunida com segurança e tranquilidade",
  },
]

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImage((currentImage) => (currentImage + 1) % heroImages.length)
    }, 8000)

    return () => window.clearInterval(intervalId)
  }, [])

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
            src={heroImages[activeImage].src}
            alt={heroImages[activeImage].alt}
            className="hero-img"
          />
        </div>
      </div>
    </section>
  )
}
