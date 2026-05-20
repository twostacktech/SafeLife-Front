import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const questions = [
    {
      q: "O que é o Seguro de Vida da SafeLife?",
      a: "É uma proteção financeira que garante uma indenização aos seus beneficiários em casos de imprevistos como morte, invalidez ou doenças graves, além de oferecer benefícios em vida.",
    },
    {
      q: "Quem pode contratar?",
      a: "Pessoas físicas entre 18 e 65 anos, residentes no Brasil, podem contratar o seguro diretamente pelo site, sem burocracia.",
    },
    {
      q: "Quais coberturas estão incluídas?",
      a: "Morte por qualquer causa, invalidez por acidente, invalidez por doença, diagnóstico de doenças graves e assistência funeral familiar.",
    },
    {
      q: "Como funciona o pagamento?",
      a: "Você escolhe o valor do capital segurado e a forma de pagamento: mensal, anual ou débito automático no cartão.",
    },
    {
      q: "Posso cancelar quando quiser?",
      a: "Sim. O cancelamento pode ser feito a qualquer momento pela Área do Cliente, sem multas ou taxas adicionais.",
    },
  ]

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <span className="subtitle-red">AJUDA</span>
          <h2>Dúvidas Frequentes</h2>
          <p>Tudo o que você precisa saber antes de contratar.</p>
        </div>

        <div className="faq-list">
          {questions.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <article className={`faq-item ${isOpen ? "open" : ""}`} key={item.q}>
                <button
                  className="faq-question"
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <strong>{item.q}</strong>
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
