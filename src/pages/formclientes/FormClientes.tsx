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

    function formatarCPF(valor: string) {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14);
    }

    function formatarTelefone(valor: string) {
        return valor
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/g, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .slice(0, 15);
    }

    const atualizarCampo = (e: React.ChangeEvent<HTMLInputElement>) => {

        let valor = e.target.value;

        if (e.target.name === "cpf") {
            valor = formatarCPF(valor);
        }

        if (e.target.name === "telefone") {
            valor = formatarTelefone(valor);
        }

        setFormData({
            ...formData,
            [e.target.name]: valor
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {clienteEditando ? "Editar Cliente" : "Novo Cliente"}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Preencha os dados do cliente abaixo.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <X
                            size={22}
                            className="text-gray-500"
                        />
                    </button>

                </div>

                {/* FORM */}
                <form
                    onSubmit={salvarCliente}
                    className="p-6"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* NOME */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Nome
                            </label>

                            <input
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-gray-300
                                    rounded-xl
                                    outline-none
                                    transition
                                    focus:ring-2
                                    focus:ring-red-500
                                    focus:border-red-500
                                "
                                name="nome"
                                value={formData.nome}
                                onChange={atualizarCampo}
                                placeholder="Enzo Lorenzo"
                                maxLength={100}
                                required
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>

                            <input
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-gray-300
                                    rounded-xl
                                    outline-none
                                    transition
                                    focus:ring-2
                                    focus:ring-red-500
                                    focus:border-red-500
                                "
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={atualizarCampo}
                                placeholder="seuemail@mail.com"
                                maxLength={120}
                                required
                            />
                        </div>

                        {/* CPF */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                CPF
                            </label>

                            <input
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-gray-300
                                    rounded-xl
                                    outline-none
                                    transition
                                    focus:ring-2
                                    focus:ring-red-500
                                    focus:border-red-500
                                "
                                name="cpf"
                                value={formData.cpf}
                                onChange={atualizarCampo}
                                placeholder="123.456.789-01"
                                maxLength={14}
                                inputMode="numeric"
                                required
                            />
                        </div>

                        {/* DATA NASCIMENTO */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Data de Nascimento
                            </label>

                            <input
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-gray-300
                                    rounded-xl
                                    outline-none
                                    transition
                                    focus:ring-2
                                    focus:ring-red-500
                                    focus:border-red-500
                                "
                                type="date"
                                name="data_nascimento"
                                value={formData.data_nascimento}
                                onChange={atualizarCampo}
                                required
                            />
                        </div>

                        {/* TELEFONE */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Telefone
                            </label>

                            <input
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-gray-300
                                    rounded-xl
                                    outline-none
                                    transition
                                    focus:ring-2
                                    focus:ring-red-500
                                    focus:border-red-500
                                "
                                name="telefone"
                                value={formData.telefone}
                                onChange={atualizarCampo}
                                placeholder="(11) 99999-9999"
                                maxLength={15}
                                inputMode="numeric"
                                required
                            />
                        </div>

                        {/* SENHA */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Senha
                            </label>

                            <input
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-gray-300
                                    rounded-xl
                                    outline-none
                                    transition
                                    focus:ring-2
                                    focus:ring-red-500
                                    focus:border-red-500
                                "
                                type="password"
                                name="senha"
                                value={formData.senha}
                                onChange={atualizarCampo}
                                placeholder="Digite uma senha"
                                minLength={6}
                                maxLength={30}
                            />
                        </div>

                    </div>

                    {/* BOTÕES */}
                    <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-gray-200">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                px-5
                                py-2.5
                                rounded-xl
                                bg-gray-200
                                text-gray-700
                                font-medium
                                hover:bg-gray-300
                                transition
                            "
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="
                                px-6
                                py-2.5
                                rounded-xl
                                bg-red-700
                                text-white
                                font-medium
                                hover:bg-red-800
                                transition
                                shadow-md
                            "
                        >
                            {clienteEditando ? "Salvar Alterações" : "Cadastrar Cliente"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default FormClientes;