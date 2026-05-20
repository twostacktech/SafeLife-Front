import type Apolice from "./Apolice";

export default interface Cliente {
    cpf: string;
    nome: string;
    data_nascimento: Date;
    telefone: string;
    email: string;
    senha: string;
    apolice: Apolice[];
}