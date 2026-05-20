import { useState } from "react"; // 1. IMPORTAR O USESTATE
import { Plus, Users, Trash } from "@phosphor-icons/react";
import FormClientes from "../formclientes/FormClientes"; // 2. IMPORTAR O SEU MODAL
import { useEffect } from "react";
import { buscar, deletar } from "../../services/Service";

export interface Beneficiario {
    id?: number;
    nome: string;
    parentesco: string;
    percentual: number;
}

export interface Cliente {
    id?: number;
    nome: string;
    email: string;
    cpf: string;
    beneficiarios: Beneficiario[];
}

function Clientes() {
    // 3. ESTADO PARA CONTROLAR A ABERTURA DO MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [clientes, setClientes] = useState<Cliente[]>([]);

    async function listarClientes() {
        try {
            // Conferir se endpoint '/clientes' é o mesmo do controlador do Backend
            await buscar("/clientes", setClientes);
        } catch (error) {
            console.error("Erro ao listar os clientes:", error);
        }
    }

    async function excluirCliente(id: number) {
        if (window.confirm("Deseja realmente excluir este cliente?")) {
            try {
                await deletar(`/clientes/${id}`);
                listarClientes(); // Atualiza a tela após deletar
            } catch (error) {
                alert("Erro ao excluir o cliente.");
            }
        }
    }

    useEffect(() => {
        listarClientes();
    }, []);


    return (
        <div className="mx-auto max-w-7xl px-6 py-10 antialiased text-gray-800">
            {/* HEADER */}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Clientes</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Gerencie segurados e seus beneficiários.
                    </p>
                </div>

                {/* 4. ADICIONADO O ONCLICK PARA ABRIR O MODAL */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-red-800 active:scale-95"
                >
                    Novo cliente
                    <Plus size={16} weight="bold" />
                </button>
            </div>

            {/* SEARCH */}
            <input
                type="search"
                placeholder="Filtrar por nome, e-mail, CPF ou beneficiário..."
                className="mt-6 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition"
            />

            {/* LISTA */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {clientes.map((c) => (
                    <article
                        key={c.id}
                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]"
                    >
                        {/* HEADER CARD */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500">
                                    <Users size={20} />
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-gray-900">
                                        {c.nome}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {c.email} · {c.cpf}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => c.id && excluirCliente(c.id)}
                                className="rounded-md p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                            >
                                <Trash size={18} />
                            </button>
                        </div>

                        {/* BENEFICIÁRIOS */}
                        <div className="mt-5">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Beneficiários
                            </h4>

                            <ul className="mt-2 space-y-1.5">
                                {c.beneficiarios.map((b, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5 text-sm"
                                    >
                                        <span className="font-semibold text-gray-800">
                                            {b.nome}
                                        </span>

                                        <span className="text-xs text-gray-500">
                                            {b.parentesco} · {b.percentual}%
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>

            {/* 5. RENDERIZAR O MODAL PASSANDO O CONTROLE DE ESTADO CORRIGIDO */}
            <FormClientes
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                atualizarListagem={listarClientes}
            />
        </div>
    );
}

export default Clientes;

