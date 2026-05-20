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

  const scrollToFAQ = () => {
    const el = document.getElementById("faq")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

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
            <a 
              href="https://api.whatsapp.com/send?phone=5511957943523&text=Olá%20SafeLife%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20seguros%20de%20vida."
              target="_blank"
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              Fale conosco
            </a>
            <button
              className="btn-secondary"
              type="button"
              onClick={scrollToFAQ}
            >
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
