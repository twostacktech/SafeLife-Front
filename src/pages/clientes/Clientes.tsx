import { useState, useEffect } from "react";
import { Plus, Trash, PencilSimple, MagnifyingGlass } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import FormClientes from "../formclientes/FormClientes";
import { buscar, deletar } from "../../services/Service";

export interface Cliente {
    cpf: string;
    nome: string;
    email: string;
    data_nascimento?: string;
    telefone?: string;
    senha?: string;
}

function Clientes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
    const [cpfBusca, setCpfBusca] = useState("");

    const cpfBuscaNumeros = cpfBusca.replace(/\D/g, "");
    const clientesFiltrados = clientes.filter((cliente) => {
        if (!cpfBuscaNumeros) return true;

        return cliente.cpf?.replace(/\D/g, "").includes(cpfBuscaNumeros);
    });

    async function listarClientes() {
        try {
            await buscar("/clientes", setClientes);
        } catch (error) {
            console.error("Erro ao listar os clientes:", error);
        }
    }

    function lidarComBusca(e: React.FormEvent) {
        e.preventDefault();
    }

    function limparBusca() {
        setCpfBusca("");
    }

    async function excluirCliente(cpf: string) {
        if (window.confirm("Deseja realmente excluir este cliente?")) {
            try {
                await deletar(`/clientes/${cpf}`);
                toast.success("Cliente excluído com sucesso!");
                listarClientes();
            } catch (error) {
                toast.error("Erro ao excluir o cliente.");
            }
        }
    }

    function abrirCadastro() {
        setClienteEditando(null);
        setIsModalOpen(true);
    }

    function abrirEdicao(cliente: Cliente) {
        setIsModalOpen(true);
        setClienteEditando(cliente);
    }

    function fecharModal() {
        setIsModalOpen(false);
        setTimeout(() => setClienteEditando(null), 150);
    }

    useEffect(() => {
        listarClientes();
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-6 py-10 text-gray-800 min-h-[70vh] flex flex-col">
            <div className="grow">

                {/* HEADER */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Clientes</h1>
                        <p className="text-sm text-gray-500">
                            Gerencie os clientes cadastrados.
                        </p>
                    </div>

                    <button
                        onClick={abrirCadastro}
                        className="flex items-center gap-2 rounded-xl bg-red-700 px-5 py-2.5 text-white hover:bg-red-800 transition shadow-sm"
                    >
                        Novo cliente <Plus size={16} />
                    </button>
                </div>

                {/* BUSCAR */}
                <form onSubmit={lidarComBusca} className="mt-8 max-w-3xl">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Buscar Segurado por CPF
                    </label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
                                placeholder="Digite o CPF (somente números)"
                                value={cpfBusca}
                                onChange={(e) => setCpfBusca(e.target.value)}
                            />
                            <MagnifyingGlass size={18} className="absolute right-3 top-2.5 text-gray-400" />
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-sm font-medium transition shadow-sm"
                        >
                            Buscar
                        </button>

                        {cpfBusca && (
                            <button
                                type="button"
                                onClick={limparBusca}
                                className="px-3 py-2 text-sm font-medium bg-gray-400 text-gray-800  hover:text-blue-900 hover:bg-gray-300 rounded-xl transition"
                            >
                                Voltar
                            </button>
                        )}
                    </div>
                </form>

                {/* LISTA */}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {clientesFiltrados.map((c) => (
                        <article
                            key={c.cpf}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-800">{c.nome}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {c.email} · {c.cpf}
                                    </p>
                                </div>

                                <div className="flex gap-1">
                                    <button
                                        onClick={() => abrirEdicao(c)}
                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                                    >
                                        <PencilSimple size={18} />
                                    </button>

                                    <button
                                        onClick={() => excluirCliente(c.cpf)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {clientesFiltrados.length === 0 && (
                    <p className="mt-6 text-sm font-medium text-red-600">
                        Nenhum cliente encontrado com este CPF.
                    </p>
                )}
            </div>

            {/* MODAL */}
            <FormClientes
                isOpen={isModalOpen}
                onClose={fecharModal}
                atualizarListagem={listarClientes}
                clienteEditando={clienteEditando}
            />
        </div>
    );
}

export default Clientes;
