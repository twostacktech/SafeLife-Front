type FormApoliceProps = {
  fecharModal: () => void
}

function FormApolice({ fecharModal }: FormApoliceProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-950">
            Nova apólice
          </h2>

          <button
            onClick={fecharModal}
            className="text-2xl text-slate-700"
          >
            ×
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block font-semibold">
              CPF do cliente
            </label>

            <input
              type="text"
              placeholder="Digite o CPF do cliente"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Cobertura
            </label>

            <select className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none">
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
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Mensalidade
              </label>

              <input
                type="number"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block font-semibold">
                Status
              </label>

              <select className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none">
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