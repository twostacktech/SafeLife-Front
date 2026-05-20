import type Beneficiario from "./Beneficiarios";
import type Cliente from "./Cliente";

export default interface Apolice {
    id_apolice: number;
    data_inicio: Date;
    mensalidade: number;
    valor_segurado: number;
    status: string;
    cobertura: string;
    cliente: Cliente;
    beneficiario: Beneficiario[];
}
