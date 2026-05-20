import { useState, useEffect } from "react";
import { Plus, Trash, PencilSimple } from "@phosphor-icons/react";
import FormClientes from "../formclientes/FormClientes";
import { buscar, deletar } from "../../services/Service";

export interface Beneficiario {
    id?: number;
    nome: string;
    parentesco: string;
    percentual: number;
}

export interface Apolice {
    beneficiario: Beneficiario[];
}

export interface Cliente {
    cpf: string;
    nome: string;
    email: string;
    apolice?: Apolice[];
}

function Clientes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

    async function listarClientes() {
        try {
            await buscar("/clientes", setClientes);
        } catch (error) {
            console.error("Erro ao listar os clientes:", error);
        }
    }

    async function excluirCliente(cpf: string) {
        if (window.confirm("Deseja realmente excluir este cliente?")) {
            try {
                await deletar(`/clientes/${cpf}`);
                listarClientes();
            } catch (error) {
                alert("Erro ao excluir o cliente.");
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
        <div className="mx-auto max-w-7xl px-6 py-10 text-gray-800">

            {/* HEADER */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Clientes</h1>
                    <p className="text-sm text-gray-500">
                        Gerencie segurados e seus beneficiários.
                    </p>
                </div>

                <button
                    onClick={abrirCadastro}
                    className="flex items-center gap-2 rounded-xl bg-red-700 px-5 py-2.5 text-white"
                >
                    Novo cliente <Plus size={16} />
                </button>
            </div>

            {/* LISTA */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {clientes.map((c) => (
                    <article
                        key={c.cpf}
                        className="rounded-2xl border bg-white p-5"
                    >
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-bold">{c.nome}</h3>
                                <p className="text-sm text-gray-500">
                                    {c.email} · {c.cpf}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                {/* EDITAR */}
                                <button
                                    onClick={() => abrirEdicao(c)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                                >
                                    <PencilSimple size={18} />
                                </button>

                                {/* DELETAR */}
                                <button
                                    onClick={() => excluirCliente(c.cpf)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
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