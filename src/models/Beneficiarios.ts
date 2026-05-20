import type Apolice from "./Apolice";

export default interface Beneficiario {
    id_beneficiario: number;
    nome: string;
    cpf: string;
    parentesco: string;
    percentual: number;
    apolice: Apolice;
}
