import {
    UsersThree,
    FileText,
    CurrencyDollar,
    ChartBar,
    ArrowLeft,
} from "@phosphor-icons/react";

import { useNavigate } from "react-router-dom";

function Relatorios() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-100 px-24 py-10">
            <div className="max-w-6xl mx-auto">

                {/* BOTÃO VOLTAR */}
                <button
                    onClick={() => navigate("/funcionarios")}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-8 hover:text-cyan-500 transition duration-200"
                >
                    <ArrowLeft size={18} />
                    Voltar
                </button>

                {/* HEADER */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900">
                        Relatórios
                    </h1>

                    <p className="text-slate-600 text-lg mt-2">
                        Visão geral da sua operação.
                    </p>
                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* CARD 1 */}
                    <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-red-100 p-3 rounded-xl">
                                <UsersThree
                                    size={24}
                                    className="text-red-600"
                                />
                            </div>

                            <span className="text-slate-600 font-medium">
                                Clientes
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900">
                            2
                        </h2>
                    </div>

                    {/* CARD 2 */}
                    <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-red-100 p-3 rounded-xl">
                                <FileText
                                    size={24}
                                    className="text-red-600"
                                />
                            </div>

                            <span className="text-slate-600 font-medium">
                                Apólices ativas
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900">
                            2
                        </h2>
                    </div>

                    {/* CARD 3 */}
                    <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-red-100 p-3 rounded-xl">
                                <CurrencyDollar
                                    size={24}
                                    className="text-red-600"
                                />
                            </div>

                            <span className="text-slate-600 font-medium">
                                Receita mensal
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900">
                            R$ 199,90
                        </h2>
                    </div>

                    {/* CARD 4 */}
                    <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-red-100 p-3 rounded-xl">
                                <ChartBar
                                    size={24}
                                    className="text-red-600"
                                />
                            </div>

                            <span className="text-slate-600 font-medium">
                                Cobertura total
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900">
                            R$ 400.000,00
                        </h2>
                    </div>
                </div>

                {/* RELATÓRIO */}
                <div className="bg-white rounded-2xl border border-slate-300 p-8 mt-10 shadow-sm">

                    <h2 className="text-2xl font-bold text-slate-900 mb-8">
                        Apólices por tipo
                    </h2>

                    <div className="flex flex-col gap-6">

                        {/* ITEM */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium text-slate-700">
                                    Vida Individual
                                </span>

                                <span className="font-bold text-slate-900">
                                    1
                                </span>
                            </div>

                            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                <div className="bg-blue-700 h-full rounded-full w-[50%]" />
                            </div>
                        </div>

                        {/* ITEM */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium text-slate-700">
                                    Vida em Grupo
                                </span>

                                <span className="font-bold text-slate-900">
                                    5
                                </span>
                            </div>

                            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                <div className="bg-red-700 h-full rounded-full w-[60%]" />
                            </div>
                        </div>

                        {/* ITEM */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium text-slate-700">
                                    Acidentes Pessoais
                                </span>

                                <span className="font-bold text-slate-900">
                                    4
                                </span>
                            </div>

                            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                <div className="bg-blue-700 h-full rounded-full w-[20%]" />
                            </div>
                        </div>

                        {/* ITEM */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-medium text-slate-700">
                                    Doenças Graves
                                </span>

                                <span className="font-bold text-slate-900">
                                    7
                                </span>
                            </div>

                            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                               <div className="bg-red-700 h-full rounded-full w-[80%]" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Relatorios;