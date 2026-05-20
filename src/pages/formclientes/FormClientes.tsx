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
                    () => {}
                );
                alert("Cliente atualizado com sucesso!");
            } else {
                await cadastrar(
                    "/clientes/cadastrar",
                    dadosParaEnviar,
                    () => {}
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
            <div className="w-full max-w-lg bg-white p-6 rounded-2xl">

                {/* HEADER */}
                <div className="flex justify-between border-b pb-3">
                    <h2 className="font-bold text-lg">
                        {clienteEditando ? "Editar cliente" : "Novo cliente"}
                    </h2>

                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={salvarCliente} className="mt-4 space-y-3">

                    <input
                        name="nome"
                        value={formData.nome}
                        onChange={atualizarCampo}
                        placeholder="Nome"
                    />

                    <input
                        name="email"
                        value={formData.email}
                        onChange={atualizarCampo}
                        placeholder="Email"
                    />

                    <input
                        name="cpf"
                        value={formData.cpf}
                        onChange={atualizarCampo}
                        placeholder="CPF"
                    />

                    <input
                        type="date"
                        name="data_nascimento"
                        value={formData.data_nascimento}
                        onChange={atualizarCampo}
                    />

                    <input
                        name="telefone"
                        value={formData.telefone}
                        onChange={atualizarCampo}
                        placeholder="Telefone"
                    />

                    <input
                        name="senha"
                        value={formData.senha}
                        onChange={atualizarCampo}
                        placeholder="Senha"
                    />

                    {/* BENEFICIÁRIOS */}
                    <div className="flex justify-between mt-4">
                        <h3>Beneficiários</h3>

                        <button type="button" onClick={adicionarBeneficiario}>
                            <Plus />
                        </button>
                    </div>

                    {beneficiarios.map((b, index) => (
                        <div key={index} className="bg-gray-100 p-3 rounded mt-2">

                            <input
                                value={b.nome}
                                onChange={(e) => {
                                    const copy = [...beneficiarios];
                                    copy[index].nome = e.target.value;
                                    setBeneficiarios(copy);
                                }}
                                placeholder="Nome"
                            />

                            <input
                                value={b.parentesco}
                                onChange={(e) => {
                                    const copy = [...beneficiarios];
                                    copy[index].parentesco = e.target.value;
                                    setBeneficiarios(copy);
                                }}
                                placeholder="Parentesco"
                            />

                            <input
                                type="number"
                                value={b.percentual}
                                onChange={(e) => {
                                    const copy = [...beneficiarios];
                                    copy[index].percentual = e.target.value;
                                    setBeneficiarios(copy);
                                }}
                                placeholder="%"
                            />

                            {beneficiarios.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removerBeneficiario(index)}
                                >
                                    <Trash />
                                </button>
                            )}
                        </div>
                    ))}

                    {/* BOTÕES */}
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="submit">
                            Salvar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default FormClientes;