import { AcaoOrcamentaria } from "./AcaoOrcamentaria"
import { PessoaFisica, PessoaJuridica } from "./Pessoa"

export interface Empenho {
    _id: number
    nuEmpenho: string
    dtEmpenho: string
    tpEmpenho: string
    idTipoDespesa: number
    idDotacao: number
    idNaturezaDespesa: number
    tpCredor: number
    flPassivoAnterior: boolean
    dsHistorico: string
    vlEmpenho: number
    idSubfonte: number
    idPessoaJuridica: number
    idPessoaFisica: number
    idElementoDespesaTC: number
    idContaPCASP: number
    idModalidadeContratacao: number
    nuContratacao: string
    nuContrato: string
    vlReforco: number
    vlAnulacao: number
    vlPago: number
    vlSaldoEmpenho: number
    dtCadastro: string
    dtAlteracao: string
    flSaldoItem: boolean
    idLeiModalidade: number
    idContaCorrentePessoa: number
    dtAno: number
    dtMes: string
    dtAnoMes: number
    idEntidade: number
    idPCASPDetalhado: number
    flRecursoFederal: boolean
    tpOrigemRecurso: number
    vlLiquidado: number
    vlCompromisso: number
    vlSaldoDotacaoAnterior: number
    vlSaldoDotacaoAtual: number
    naturezaDespesa : NaturezaDespesa
    dotacao: Dotacao
    tipoDespesa: TipoDespesa
    liquidacao: Liquidacao[]
    itensEmpenho: ItemEmpenho[]
    alteracoesEmpenho: AlteracoesEmpenho[]
    pessoaFisica : PessoaFisica | null
    pessoaJuridica : PessoaJuridica | null
}
export interface NaturezaDespesa {
    idNaturezaDespesa: number;
    nuClasse: number;
    nuGrupo: string;
    cdModalidade: string;
    cdElemento: string;
    cdSubelemento: string;
    cdDespesa: string;
    nmNaturezaDespesa: string;
    nuNivel: number;
    dtDesativacao?: Date | null;
    dtCadastro?: Date | null;
    dtAlteracao?: Date | null;
    tpRegistro: number;
}
export interface Dotacao {
    idDotacao: number
    cdDotacao: string
    idAcaoOrcamentaria: number
    tpOrigem: number
    idNaturezaDespesa: number
    idIduso: number
    idFonteRecurso: number
    idIdoc: number
    idIndicadorResultado: number
    idFonteRecursoComplemento: number
    vlDotacao: number
    dtCadastro: string
    dtAlteracao: string
    tpGrupoFonte: string
    dtAno: number
    dtMes: string
    cdValidacao: string
    idSubfonte: number
    dtAnoMes: number
    idEntidade: number
    acaoOrcamentaria: AcaoOrcamentaria
    fonteRecurso: FonteRecurso
}

interface PagamentoRetencao {
    idPagamentoRetencao: number;         
    idPagamento: number;                 
    idContaPcaspDetalhado: number;       
    dtCompetencia: string;               
    dtVencimento: Date;                  
    vlValor: number;                     
    nuPercentual?: number | null;        
    idPessoaJuridica?: number | null;    
    tpGuiaRecolhimento?: number | null;  
    idLiquidacaoRetencao?: number | null;
    dtCadastro: Date;                    
    dtAlteracao?: Date | null;           
    cdPagamentoRetencao: string;         
}
interface EstornoPagamento {
    _id: number;      
    cdEstornoPagamento: number;      
    dtEstornoPagamento: Date;        
    dsEstornoPagamento: string;      
    vlEstornoPagamento: number;      
    flEstornoParcial: boolean;       
    idPagamento: number;             
    idEntidade: number;              
    dtCadastro: Date;                
    dtAlteracao?: Date | null;       
    dtAno: number;                   
    dtMes: string;                   
    dtAnoMes: number;                
    idPagContaBanco?: number | null; 
  }

export interface FonteRecurso {
    idFonteRecurso: number
    cdFonteRecurso: string
    nmFonteRecurso: string
    dsEspecificacao: string
    nmGrupo: string
    dtCadastro: string
    dtAlteracao: string
    dtDesativacao: string
}

export interface TipoDespesa {
    idTipoDespesa: number
    cdTipoDespesa: number
    nmTipoDespesa: string
    flContrato: boolean
    dtDesativacao: string
    dtCadastro: string
    dtAlteracao: string
    nuOrdem: number
}

export interface Liquidacao {
    _id : number
    nuLiquidacao: string
    idEmpenho: number
    dtLiquidacao: string
    tpOrigemProbatoria: string
    dsHistorico: string
    vlBruto: number
    vlLiquido: number
    dtPrevisaoPagamento: string
    dtCadastro: string
    dtAlteracao: string
    idContaCorrentePessoa: number
    vlLiquidadoPagar: number
    dtAno: number
    dtMes: string
    dtAnoMes: number
    idEntidade: number
    idCompromisso: number
    idCompromissoDoc: number
    vlRetido: number
    vlEstornado: number
    vlTotalLiquidado: number
    vlTotalPago: number
    vlPatrimonial: number
    pagamentos: Pagamento[]
}

export interface Pagamento {
    _id : number
    nuPagamento: string
    dtPagamento: string
    idLiquidacao: number
    dsHistorico: string
    vlPagamento: number
    vlLiquidoPago: number
    vlRetido: number
    dtCadastro: string
    dtAlteracao: string
    dtAno: number
    dtMes: string
    dtAnoMes: number
    idEntidade: number
    idContaCorrentePessoa: number
    vlLiquido: number
    idClassificacaoPag: number
}

export interface ItemEmpenho {
    _id: number
    idEmpenho: number
    idProdutoServico: number
    idMetricaMedida: number
    qtItem: number
    vlUnitario: number
    vlTotal: number
    dtCadastro: string
    dtAlteracao: string
    produtoServico: ProdutoServico
}

export interface ProdutoServico {
    idProdutoServico: number
    tpAquisicao: string
    idGrupoProduto: number
    nmProdutoServico: string
    dsDetalhamento: string
    idClasseProduto: number
    dtCadastro: string
    dtAlteracao: string
    dtDesativacao: string
    idMetricaMedida: number
    vlProduto: number
    vlAtual: number
    cdProdutoServico: number
}

export interface AlteracaoEmpenho {
    _id: number
    idEmpenho: number
    cdAlteracaoEmpenho: string
    dtOperacao: string
    tpOperacaoEmpenho: string
    dsAlteracaoEmpenho: string
    vlOperacao: number
    dtCadastro: string
    dtAlteracao: string
    dtAno: number
    dtMes: string
    dtAnomes: number
    idEntidade: number
    vlSaldoDotacaoAnterior: number
    vlSaldoDotacaoAtual: number
}
