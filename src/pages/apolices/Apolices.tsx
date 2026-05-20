import { useEffect, useState } from "react"
import { buscar } from "../../services/Service"
import type Apolice from "../../models/Apolice"
import FormApolice from "../formApolice/FormApolice"

function Apolices() {
  const [apolices, setApolices] = useState<Apolice[]>([])
  const [modalAberto, setModalAberto] = useState(false)
  const [busca, setBusca] = useState("")
  const [coberturaSelecionada, setCoberturaSelecionada] = useState("Todos")
  const [statusSelecionado, setStatusSelecionado] = useState("Todos")

  const formatarMoeda = (valor?: number | string) => {
    const valorNumerico = Number(valor)

    if (Number.isNaN(valorNumerico)) return "-"

    return valorNumerico.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const formatarData = (data?: Date | string) => {
    if (!data) return "-"

    if (typeof data === "string" && data.includes("-")) {
      const [ano, mes, dia] = data.split("T")[0].split("-")

      return `${dia}/${mes}/${ano}`
    }

    const dataFormatada = new Date(data)

    if (Number.isNaN(dataFormatada.getTime())) return "-"

    return dataFormatada.toLocaleDateString("pt-BR")
  }

  const apolicesFiltradas = apolices.filter((apolice) => {
    const termoBusca = busca.trim().toLowerCase()
    const dadosBusca = [
      apolice.id_apolice.toString(),
      apolice.cliente?.nome,
      apolice.cliente?.cpf,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    const correspondeBusca = !termoBusca || dadosBusca.includes(termoBusca)
    const correspondeCobertura =
      coberturaSelecionada === "Todos" ||
      apolice.cobertura === coberturaSelecionada
    const correspondeStatus =
      statusSelecionado === "Todos" || apolice.status === statusSelecionado

    return correspondeBusca && correspondeCobertura && correspondeStatus
  })

  async function buscarApolices() {
    try {
      await buscar("/apolices", setApolices)
    } catch (error) {
      console.log("Erro ao buscar apólices:", error)
    }
  }

  useEffect(() => {
    buscarApolices()
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-950">
            Apólices
          </h1>

          <p className="mt-2 text-slate-500">
            Filtre apólices por cobertura, status e cliente.
          </p>
        </div>

        <button
          onClick={() => setModalAberto(true)}
          className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
        >
          + Nova apólice
        </button>
      </section>

      <section className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Buscar nº ou cliente..."
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-5 py-4 outline-none"
        />

        <select
          value={coberturaSelecionada}
          onChange={(evento) => setCoberturaSelecionada(evento.target.value)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-4 outline-none"
        >
          <option>Todos</option>
          <option>Vida Individual</option>
          <option>Vida em Grupo</option>
          <option>Acidentes Pessoais</option>
          <option>Doenças Graves</option>
        </select>

        <select
          value={statusSelecionado}
          onChange={(evento) => setStatusSelecionado(evento.target.value)}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-4 outline-none"
        >
          <option>Todos</option>
          <option>Ativa</option>
          <option>Pendente</option>
          <option>Cancelada</option>
        </select>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm uppercase text-slate-600">
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Cliente</th>
              <th className="px-5 py-4">CPF</th>
              <th className="px-5 py-4">Cobertura</th>
              <th className="px-5 py-4">Valor Segurado</th>
              <th className="px-5 py-4">Mensalidade</th>
              <th className="px-5 py-4">Início</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {apolicesFiltradas.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-16 text-center text-slate-500"
                >
                  Nenhuma apólice encontrada.
                </td>
              </tr>
            ) : (
              apolicesFiltradas.map((apolice) => (
                <tr
                  key={apolice.id_apolice}
                  className="border-t border-slate-200"
                >
                  <td className="px-5 py-4 font-semibold">
                    {apolice.id_apolice}
                  </td>

                  <td className="px-5 py-4">
                    {apolice.cliente?.nome ?? "-"}
                  </td>

                  <td className="px-5 py-4">
                    {apolice.cliente?.cpf ?? "-"}
                  </td>

                  <td className="px-5 py-4">
                    {apolice.cobertura || "-"}
                  </td>

                  <td className="px-5 py-4">
                    {formatarMoeda(apolice.valor_segurado)}
                  </td>

                  <td className="px-5 py-4">
                    {formatarMoeda(apolice.mensalidade)}
                  </td>

                  <td className="px-5 py-4">
                    {formatarData(apolice.data_inicio)}
                  </td>

                  <td className="px-5 py-4">
                    {apolice.status || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {modalAberto && (
        <FormApolice
          fecharModal={() => setModalAberto(false)}
          atualizarListagem={buscarApolices}
          adicionarApolice={(apolice) =>
            setApolices((apolicesAtuais) => {
              const apoliceJaExiste = apolicesAtuais.some(
                (apoliceAtual) =>
                  apoliceAtual.id_apolice === apolice.id_apolice
              )

              if (apoliceJaExiste) return apolicesAtuais

              return [...apolicesAtuais, apolice]
            })
          }
        />
      )}
    </main>
  )
}

export default Apolices
