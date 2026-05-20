import { useState } from "react"
import { toast } from "react-toastify"
import { api, cadastrar } from "../../services/Service"
import type Apolice from "../../models/Apolice"
import type Cliente from "../../models/Cliente"

type FormApoliceProps = {
  fecharModal: () => void
  atualizarListagem: () => Promise<void> | void
  adicionarApolice: (apolice: Apolice) => void
}

function FormApolice({
  fecharModal,
  atualizarListagem,
  adicionarApolice,
}: FormApoliceProps) {
  const [formData, setFormData] = useState({
    cpf: "",
    cobertura: "Vida Individual",
    valor_segurado: "",
    mensalidade: "",
    status: "Ativa",
    data_inicio: "",
  })

  const atualizarCampo = (
    evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [evento.target.name]: evento.target.value,
    })
  }

  async function cadastrarApolice(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const dadosParaEnviar = {
      data_inicio: formData.data_inicio,
      mensalidade: Number(formData.mensalidade),
      valor_segurado: Number(formData.valor_segurado),
      status: formData.status,
      cobertura: formData.cobertura,
      cliente: {
        cpf: formData.cpf,
      },
    }

    try {
      const apoliceCadastrada = await cadastrar(
        "/apolices",
        dadosParaEnviar,
        () => {}
      )
      const respostaCliente = await api.get<Cliente>(`/clientes/${formData.cpf}`)
      const apoliceCompleta = {
        ...dadosParaEnviar,
        ...apoliceCadastrada,
        valor_segurado: Number(formData.valor_segurado),
        mensalidade: Number(formData.mensalidade),
        data_inicio: formData.data_inicio,
        cliente: respostaCliente.data,
      } as Apolice

      toast.success("Apólice cadastrada com sucesso!")
      await atualizarListagem()
      adicionarApolice(apoliceCompleta)
      fecharModal()
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cadastrar apólice. Verifique os dados e tente novamente.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-950">
            Nova apólice
          </h2>

          <button
            type="button"
            onClick={fecharModal}
            className="text-2xl text-slate-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={cadastrarApolice} className="space-y-4">
          <div>
            <label className="mb-2 block font-semibold">
              CPF do cliente
            </label>

            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={atualizarCampo}
              placeholder="Digite o CPF do cliente"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Cobertura
            </label>

            <select
              name="cobertura"
              value={formData.cobertura}
              onChange={atualizarCampo}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Vida Individual</option>
              <option>Vida em Grupo</option>
              <option>Acidentes Pessoais</option>
              <option>Doenças Graves</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-semibold">
                Valor segurado (R$)
              </label>

              <input
                type="number"
                name="valor_segurado"
                value={formData.valor_segurado}
                onChange={atualizarCampo}
                min="0"
                step="0.01"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Mensalidade
              </label>

              <input
                type="number"
                name="mensalidade"
                value={formData.mensalidade}
                onChange={atualizarCampo}
                min="0"
                step="0.01"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-semibold">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={atualizarCampo}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
              >
                <option>Ativa</option>
                <option>Pendente</option>
                <option>Cancelada</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Data de início
              </label>

              <input
                type="date"
                name="data_inicio"
                value={formData.data_inicio}
                onChange={atualizarCampo}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-3">
            <button
              type="button"
              onClick={fecharModal}
              className="font-semibold text-slate-950"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormApolice
