import { useState } from "react";
import { X, Plus, Trash } from "@phosphor-icons/react";

interface Beneficiario {
  nome: string;
  parentesco: string;
  percentual: string;
}

interface FormClientesProps {
  isOpen: boolean;
  onClose: () => void;
}

function FormClientes({ isOpen, onClose }: FormClientesProps) {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([
    { nome: "", parentesco: "", percentual: "100" },
  ]);

  if (!isOpen) return null;

  const adicionarBeneficiario = () => {
    setBeneficiarios([
      ...beneficiarios,
      { nome: "", parentesco: "", percentual: "" },
    ]);
  };

  const removerBeneficiario = (index: number) => {
    setBeneficiarios(beneficiarios.filter((_, i) => i !== index));
  };

  const atualizarBeneficiario = (
    index: number,
    campo: keyof Beneficiario,
    valor: string
  ) => {
    const novosBeneficiarios = [...beneficiarios];
    novosBeneficiarios[index][campo] = valor;
    setBeneficiarios(novosBeneficiarios);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6 animate-fade-in">
      {/* CARD DO MODAL COM ALTURA MÁXIMA CONTROLADA (RESPIRO VISUAL) */}
      <div className="w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-white p-6 shadow-2xl transition-all">
        
        {/* HEADER (FIXO NO TOPO) */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-950">Novo cliente</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* FORMULÁRIO COM ROLAGEM INTERNA SE O CONTEÚDO CRESCER */}
        <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-4 overflow-y-auto flex-1 pr-1 custom-scrollbar">
          {/* NOME */}
          <div>
            <label className="text-sm font-semibold text-gray-800">Nome</label>
            <input
              type="text"
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-800">E-mail</label>
            <input
              type="email"
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
            />
          </div>

          {/* CPF */}
          <div>
            <label className="text-sm font-semibold text-gray-800">CPF</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
            />
          </div>

          {/* SEÇÃO BENEFICIÁRIOS */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Beneficiários
              </label>
              <button
                type="button"
                onClick={adicionarBeneficiario}
                className="inline-flex items-center gap-1 text-sm font-semibold text-red-700 hover:text-red-800 transition"
              >
                <Plus size={14} weight="bold" />
                Adicionar
              </button>
            </div>

            {/* LISTA DINÂMICA DE BLOCOS */}
            <div className="space-y-3">
              {beneficiarios.map((b, index) => (
                <div 
                  key={index} 
                  className="relative rounded-xl bg-gray-100 p-6 border border-gray-200 space-y-3"
                >
                  {/* BOTÃO REMOVER (LIXEIRA) NO TOPO DIREITO DO CARD */}
                  {beneficiarios.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removerBeneficiario(index)}
                      className="absolute top-3 right-3 rounded-lg p-1.5 text-red-500 hover:text-red-900 transition"
                      title="Remover beneficiário"
                    >
                      <Trash size={16} />
                    </button>
                  )}

                  {/* CAMPO NOME */}
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      Nome:
                    </label>
                    <input
                      type="text"
                      placeholder="Nome completo do beneficiário"
                      value={b.nome}
                      onChange={(e) =>
                        atualizarBeneficiario(index, "nome", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
                    />
                  </div>

                  {/* GRID PARA PARENTESCO E PERCENTUAL FICAREM LADO A LADO */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* CAMPO PARENTESCO */}
                    <div>
                      <label className="text-xs font-semibold text-gray-600 block mb-1">
                        Parentesco:
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Filho, Cônjuge"
                        value={b.parentesco}
                        onChange={(e) =>
                          atualizarBeneficiario(index, "parentesco", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
                      />
                    </div>

                    {/* CAMPO PERCENTUAL */}
                    <div>
                      <label className="text-xs font-semibold text-gray-600 block mb-1">
                        Percentual (%):
                      </label>
                      <input
                        type="number"
                        placeholder="100"
                        value={b.percentual}
                        onChange={(e) =>
                          atualizarBeneficiario(index, "percentual", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* BOTÕES DE AÇÃO (FIXOS NO RODAPÉ) */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 flex-shrink-0 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition active:scale-95"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-xl bg-red-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-red-800 active:scale-95"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormClientes;

// import { useState } from "react";
// import { X, Plus, Trash } from "@phosphor-icons/react";

// interface Beneficiario {
//   nome: string;
//   parentesco: string;
//   percentual: string;
// }

// interface FormClientesProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// function FormClientes({ isOpen, onClose }: FormClientesProps) {
//   const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([
//     { nome: "", parentesco: "", percentual: "100" },
//   ]);

//   if (!isOpen) return null;

//   const adicionarBeneficiario = () => {
//     setBeneficiarios([
//       ...beneficiarios,
//       { nome: "", parentesco: "", percentual: "" },
//     ]);
//   };

//   const removerBeneficiario = (index: number) => {
//     setBeneficiarios(beneficiarios.filter((_, i) => i !== index));
//   };

//   const atualizarBeneficiario = (
//     index: number,
//     campo: keyof Beneficiario,
//     valor: string
//   ) => {
//     const novosBeneficiarios = [...beneficiarios];
//     novosBeneficiarios[index][campo] = valor;
//     setBeneficiarios(novosBeneficiarios);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//       {/* CARD DO MODAL */}
//       <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all">
        
//         {/* HEADER */}
//         <div className="flex items-center justify-between pb-4 border-b border-gray-100">
//           <h2 className="text-xl font-bold text-slate-950">Novo cliente</h2>
//           <button
//             onClick={onClose}
//             className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
//           >
//             <X size={20} weight="bold" />
//           </button>
//         </div>

//         {/* FORMULÁRIO */}
//         <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-4">
//           {/* NOME */}
//           <div>
//             <label className="text-sm font-semibold text-gray-800">Nome</label>
//             <input
//               type="text"
//               className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
//             />
//           </div>

//           {/* EMAIL */}
//           <div>
//             <label className="text-sm font-semibold text-gray-800">E-mail</label>
//             <input
//               type="email"
//               className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
//             />
//           </div>

//           {/* CPF */}
//           <div>
//             <label className="text-sm font-semibold text-gray-800">CPF</label>
//             <input
//               type="text"
//               placeholder="000.000.000-00"
//               className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
//             />
//           </div>

//           {/* SEÇÃO BENEFICIÁRIOS */}
//           <div className="pt-2">
//             <div className="flex items-center justify-between mb-3">
//               <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">
//                 Beneficiários
//               </label>
//               <button
//                 type="button"
//                 onClick={adicionarBeneficiario}
//                 className="inline-flex items-center gap-1 text-sm font-semibold text-red-700 hover:text-red-800 transition"
//               >
//                 <Plus size={14} weight="bold" />
//                 Adicionar
//               </button>
//             </div>

//             {/* LISTA DINÂMICA EM BLOCOS CINZA */}
//             <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
//               {beneficiarios.map((b, index) => (
//                 <div 
//                   key={index} 
//                   className="relative rounded-xl bg-gray-200 p-6 border border-gray-100 space-y-3"
//                 >
//                   {/* BOTÃO REMOVER (LIXEIRA) NO TOPO DIREITO DO CARD */}
//                   {beneficiarios.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removerBeneficiario(index)}
//                       className="absolute top-3 right-3 rounded-lg p-1.5 text-red-500 hover:text-red-900 transition"
//                       title="Remover beneficiário"
//                     >
//                       <Trash size={16} />
//                     </button>
//                   )}

//                   {/* CAMPO NOME */}
//                   <div>
//                     <label className="text-xs font-semibold text-gray-600 block mb-1">
//                       Nome:
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Nome completo do beneficiário"
//                       value={b.nome}
//                       onChange={(e) =>
//                         atualizarBeneficiario(index, "nome", e.target.value)
//                       }
//                       className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
//                     />
//                   </div>

//                   {/* GRID PARA PARENTESCO E PERCENTUAL FICAREM LADO A LADO */}
//                   <div className="grid grid-cols-2 gap-3">
//                     {/* CAMPO PARENTESCO */}
//                     <div>
//                       <label className="text-xs font-semibold text-gray-600 block mb-1">
//                         Parentesco:
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="Ex: Filho, Cônjuge"
//                         value={b.parentesco}
//                         onChange={(e) =>
//                           atualizarBeneficiario(index, "parentesco", e.target.value)
//                         }
//                         className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
//                       />
//                     </div>

//                     {/* CAMPO PERCENTUAL */}
//                     <div>
//                       <label className="text-xs font-semibold text-gray-600 block mb-1">
//                         Percentual (%):
//                       </label>
//                       <input
//                         type="number"
//                         placeholder="100"
//                         value={b.percentual}
//                         onChange={(e) =>
//                           atualizarBeneficiario(index, "percentual", e.target.value)
//                         }
//                         className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* BOTÕES DE AÇÃO */}
//           <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition active:scale-95"
//             >
//               Cancelar
//             </button>
//             <button
//               type="submit"
//               className="rounded-xl bg-red-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-red-800 active:scale-95"
//             >
//               Salvar
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default FormClientes;