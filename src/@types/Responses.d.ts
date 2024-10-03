import { Empenho } from "./Despesas";
/**Abstracao para retorno de query advinda da busca atraves do endpoint de getemepenho... */
export interface GetEmopenhoResponse {
    empenho : Empenho[];
    totalItens : number;
    
}