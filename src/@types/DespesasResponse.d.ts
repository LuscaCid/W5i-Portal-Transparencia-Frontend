import { EstornoPagamento, PagamentoRetencao } from "./Despesas";

export interface ResponsePattern<T> 
{
    data: T;
    count: number;
}
export interface GetEmpenhoResponse extends ResponsePattern<Empenho[]> 
{
    empenhos: Empenho[];
}
export interface GetLiquidacaoPagamentosResponse extends ResponsePattern<Pagamento[]> 
{
    pagamentos: Pagamento[];
}

export interface GetEmpenhoLiquidacoesResponse extends ResponsePattern<Liquidacao[]> 
{
    liquidacoes: Liquidacao[];
}
export interface GetPagamentoRetencoesResponse extends ResponsePattern<Liquidacao[]> 
{
    pagamentoRetencoes: PagamentoRetencao[];
}
interface GetEstornoPagamentosResponse extends ResponsePattern<Liquidacao[]> 
{
    estornoPagamento: EstornoPagamento[];
}
export interface GetEmpenhoAlteracoesResponse extends ResponsePattern<AlteracaoEmpenho[]> 
{
    alteracoesEmpenho: AlteracaoEmpenho[];
}
export interface GetItensEmpenhoResponse extends ResponsePattern<ItemEmpenho[]> 
{
    itensEmpenho: ItemEmpenho[];
}