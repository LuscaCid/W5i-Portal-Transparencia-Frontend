import { EstornoPagamento, PagamentoRetencao } from "./Despesas";

export interface ResponsePattern<T> {    
    data : T;
    count: number;
    currentPage: string;
}
export interface GetEmpenhoResponse extends ResponsePattern<Empenho[]> {}
export interface GetLiquidacaoPagamentosResponse extends ResponsePattern<Pagamento[]> {}
export interface GetEmpenhoLiquidacoesResponse extends ResponsePattern<Liquidacao[]> {}
export interface GetPagamentoRetencoesResponse extends ResponsePattern<Liquidacao[]> {}
interface GetEstornoPagamentosResponse extends ResponsePattern<Liquidacao[]> {}
export interface GetEmpenhoAlteracoesResponse extends ResponsePattern<AlteracaoEmpenho[]> {}
export interface GetItensEmpenhoResponse extends ResponsePattern<ItemEmpenho[]> {}