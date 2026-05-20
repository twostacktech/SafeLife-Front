import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { cadastrar, atualizar } from "../../services/Service";
import type { Cliente } from "../clientes/Clientes";

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

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        cpf: "",
        data_nascimento: "",
        telefone: "",
        senha: ""
    });

    useEffect(() => {
        if (clienteEditando) {
            setFormData({
                nome: clienteEditando.nome || "",
                email: clienteEditando.email || "",
                cpf: clienteEditando.cpf || "",
                data_nascimento: clienteEditando.data_nascimento || "",
                telefone: clienteEditando.telefone || "",
                senha: ""
            });

        } else {
            setFormData({
                nome: "",
                email: "",
                cpf: "",
                data_nascimento: "",
                telefone: "",
                senha: ""
            });
        }
    }, [clienteEditando, isOpen]);

    if (!isOpen) return null;

    const atualizarCampo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    function maiorDe18Anos(data: string) {
        const hoje = new Date();
        const nascimento = new Date(data);

        let idade = hoje.getFullYear() - nascimento.getFullYear();

        const mes = hoje.getMonth() - nascimento.getMonth();

        if (
            mes < 0 ||
            (mes === 0 && hoje.getDate() < nascimento.getDate())
        ) {
            idade--;
        }

        return idade >= 18;
    }

    async function salvarCliente(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // VALIDAÇÃO DE IDADE
        if (!maiorDe18Anos(formData.data_nascimento)) {
            toast.error("O cliente deve ter no mínimo 18 anos para contratar o seguro.");
            return;
        }

        try {
            if (clienteEditando) {
                await atualizar(
                    `/clientes/${clienteEditando.cpf}`,
                    formData,
                    () => { }
                );

                toast.success("Cliente atualizado com sucesso!");

            } else {
                await cadastrar(
                    "/clientes/cadastrar",
                    formData,
                    () => { }
                );

                toast.success("Cliente cadastrado com sucesso!");
            }

            atualizarListagem();
            onClose();

        } catch (error) {
            console.error(error);
            toast.error("Erro ao salvar cliente");
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

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={salvarCliente} className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            name="nome"
                            value={formData.nome}
                            onChange={atualizarCampo}
                            placeholder="Nome"
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            name="email"
                            value={formData.email}
                            onChange={atualizarCampo}
                            placeholder="Email"
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            name="cpf"
                            value={formData.cpf}
                            onChange={atualizarCampo}
                            placeholder="CPF"
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            type="date"
                            name="data_nascimento"
                            value={formData.data_nascimento}
                            onChange={atualizarCampo}
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            name="telefone"
                            value={formData.telefone}
                            onChange={atualizarCampo}
                            placeholder="Telefone"
                        />

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            name="senha"
                            type="password"
                            value={formData.senha}
                            onChange={atualizarCampo}
                            placeholder="Senha"
                        />
                    </div>

                    {/* BOTÕES */}
                    <div className="flex justify-end gap-3 pt-4">
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
