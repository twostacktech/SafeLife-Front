import type Beneficiario from "./Beneficiarios";
import type Cliente from "./Cliente";

export default interface Apolice {
    id_apolice: number;
    data_inicio: Date | string;
    mensalidade: number | string;
    valor_segurado: number | string;
    status: string;
    cobertura: string;
    cliente: Cliente;
    beneficiario: Beneficiario[];
}
