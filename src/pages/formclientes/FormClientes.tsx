import { useEffect, useState } from "react";
import { X, Plus, Trash } from "@phosphor-icons/react";
import { cadastrar, atualizar } from "../../services/Service";
import type { Cliente } from "../clientes/Clientes";

interface Beneficiario {
    nome: string;
    parentesco: string;
    percentual: string;
}

interface FormClientesProps {
    isOpen: boolean;
    onClose: () => void;
    atualizarListagem: () => void;
    clienteEditando: Cliente | null;
}

function FormClientes({
    isOpen,
    onClose,
    atualizarListagem,
    clienteEditando
}: FormClientesProps) {

    const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([
        { nome: "", parentesco: "", percentual: "100" },
    ]);

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        cpf: "",
        data_nascimento: "",
        telefone: "",
        senha: ""
    });

    // ✅ RESET + PREENCHIMENTO AO EDITAR
    useEffect(() => {
        if (clienteEditando) {
            setFormData({
                nome: clienteEditando.nome || "",
                email: clienteEditando.email || "",
                cpf: clienteEditando.cpf || "",
                data_nascimento: "",
                telefone: "",
                senha: ""
            });

            const beneficiariosExistentes =
                clienteEditando.apolice?.[0]?.beneficiario?.map((b) => ({
                    nome: b.nome,
                    parentesco: b.parentesco,
                    percentual: String(b.percentual ?? 0)
                })) || [
                    { nome: "", parentesco: "", percentual: "100" }
                ];

            setBeneficiarios(beneficiariosExistentes);

        } else {
            setFormData({
                nome: "",
                email: "",
                cpf: "",
                data_nascimento: "",
                telefone: "",
                senha: ""
            });

            setBeneficiarios([
                { nome: "", parentesco: "", percentual: "100" },
            ]);
        }
    }, [clienteEditando, isOpen]);

    if (!isOpen) return null;

    const atualizarCampo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const adicionarBeneficiario = () => {
        setBeneficiarios([
            ...beneficiarios,
            { nome: "", parentesco: "", percentual: "" },
        ]);
    };

    const removerBeneficiario = (index: number) => {
        setBeneficiarios(beneficiarios.filter((_, i) => i !== index));
    };

    async function salvarCliente(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const dadosParaEnviar = {
            ...formData,
            apolice: [
                {
                    id_apolice: 0,
                    data_inicio: new Date().toISOString().split("T")[0],
                    mensalidade: 0,
                    valor_segurado: 0,
                    status: "Ativa",
                    cobertura: "Padrão",
                    beneficiario: beneficiarios.map((b) => ({
                        id_beneficiario: 0,
                        nome: b.nome,
                        parentesco: b.parentesco,
                        percentual: Number(b.percentual),
                    })),
                },
            ],
        };

        try {
            if (clienteEditando) {
                await atualizar(
                    `/clientes/${clienteEditando.cpf}`,
                    dadosParaEnviar,
                    () => { }
                );
                alert("Cliente atualizado com sucesso!");
            } else {
                await cadastrar(
                    "/clientes/cadastrar",
                    dadosParaEnviar,
                    () => { }
                );
                alert("Cliente cadastrado com sucesso!");
            }

            atualizarListagem();
            onClose();

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar cliente");
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
            <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl">

                {/* HEADER */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="font-bold text-xl text-gray-800">
                        {clienteEditando ? "Editar cliente" : "Novo cliente"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
                        <X size={20} />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={salvarCliente} className="space-y-4">

                    {/* GRID DE INPUTS PRINCIPAIS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                            name="nome"
                            value={formData.nome}
                            onChange={atualizarCampo}
                            placeholder="Nome"
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                            name="email"
                            value={formData.email}
                            onChange={atualizarCampo}
                            placeholder="Email"
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                            name="cpf"
                            value={formData.cpf}
                            onChange={atualizarCampo}
                            placeholder="CPF"
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 h-[42px]"
                            type="date"
                            name="data_nascimento"
                            value={formData.data_nascimento}
                            onChange={atualizarCampo}
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                            name="telefone"
                            value={formData.telefone}
                            onChange={atualizarCampo}
                            placeholder="Telefone"
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                            name="senha"
                            type="password"
                            value={formData.senha}
                            onChange={atualizarCampo}
                            placeholder="Senha"
                        />
                    </div>

                    {/* BENEFICIÁRIOS */}
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-700">Beneficiários</h3>
                            <button
                                type="button"
                                onClick={adicionarBeneficiario}
                                className="p-1 text-grey-200 hover:bg-blue-50 rounded-full transition"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        {/* Texto explicativo para orientar o usuário */}
                        <p className="text-xs text-gray-500 mb-3">
                            Informe os dados e a porcentagem de cada beneficiário. A soma total deve ser igual a 100%.
                        </p>

                        <div className="space-y-3">
                            {beneficiarios.map((b, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200 items-end">

                                    <div className="w-full md:flex-1">
                                        <label className="block text-[11px] font-medium text-gray-500 mb-1">Nome do Beneficiário</label>
                                        <input
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={b.nome}
                                            onChange={(e) => {
                                                const copy = [...beneficiarios];
                                                copy[index].nome = e.target.value;
                                                setBeneficiarios(copy);
                                            }}
                                            placeholder="Ex: Maria Leite"
                                        />
                                    </div>

                                    <div className="w-full md:w-1/3">
                                        <label className="block text-[11px] font-medium text-gray-500 mb-1">Parentesco</label>
                                        <input
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={b.parentesco}
                                            onChange={(e) => {
                                                const copy = [...beneficiarios];
                                                copy[index].parentesco = e.target.value;
                                                setBeneficiarios(copy);
                                            }}
                                            placeholder="Ex: Filho(a)"
                                        />
                                    </div>

                                    <div className="w-full md:w-24">
                                        <label className="block text-[11px] font-medium text-gray-500 mb-1">Porcentagem</label>
                                        <div className="relative flex items-center">
                                            <input
                                                className="w-full pl-3 pr-7 py-1.5 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                                                type="number"
                                                min="1"
                                                max="100"
                                                value={b.percentual}
                                                onChange={(e) => {
                                                    const copy = [...beneficiarios];
                                                    copy[index].percentual = e.target.value;
                                                    setBeneficiarios(copy);
                                                }}
                                                placeholder="0"
                                            />
                                            <span className="absolute right-2.5 text-sm text-gray-400 font-medium pointer-events-none">%</span>
                                        </div>
                                    </div>

                                    {beneficiarios.length > 1 && (
                                        <div className="pb-1">
                                            <button
                                                type="button"
                                                onClick={() => removerBeneficiario(index)}
                                                className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-md transition mb-0.5"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-400 rounded-lg transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 text-sm font-medium text-white bg-red-700 hover:bg-red-800 rounded-lg transition shadow-sm"
                        >
                            Salvar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );

}

export default FormClientes;