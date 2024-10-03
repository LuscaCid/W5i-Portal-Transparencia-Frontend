export class Constants {
    static readonly TP_ORIGEM_DOTACAO = {
       "1" : "LOA",
       "2" : "Crédito adicional especial",
       "3" : "Crédito adicional extraordinário",
       "4" : "Crédito adicional suplementar"
    }
    static readonly GRUPO_FONTERECURSO = {
        "1" : "Recursos do Exercício Corrente",
        "9" : "Recursos Condicionados"
    }
    static readonly TP_CLASSIFICACAO = {
        "1" : 'Suplementar',
        "2" : 'Especial',
        "3" : 'Extraordinário'
    }
    static readonly TIPO_PODER_ORGAO =
    {
        "10131" : 'Poder Executivo – Prefeitura Municipal',
        "10132" : 'Poder Executivo – RPPS Municipal',
        "20231" : 'Poder Legislativo - Câmara Municipal'
    }            
    static readonly  TIPO_GUIA_RECOLHIMENTO = 
    {
        "1" : "DARF",
        "2" : "DAS / ISSQN",
        "3" : "GPS",
        "4" : "FGTS",
        "5" : "GRCSU",
        "6" : "Outras"
    }
     
    static readonly TIPO_EMPENHO = {
        "1" : "Ordinário",
        "2" : "Estimado",
        "3" : "Global"
    }
    static readonly TIPO_ORIGEM_RECURSO =
    {
        "1" : 'Saúde da Família – SF',
        "2" : 'Núcleo de Apoio à Saúde da Família – NASF',
        "3" : 'Saúde Bucal – SB',
        "4" : 'Atenção de Média e Alta Complexidade',
        "5" : 'Assistência Social',
        "6" : 'Atenção Psicossocial'
    }
    static readonly ESFERA_ORCAMENTARIA =
    {
        "1" : "Orçamento fiscal",
        "2" : "Orçamento seguridade social",
        "3" : "Orçamento de investimento"
    }
    static readonly TIPO_OPERACAO_ALTERACAO_EMPENHO =
    {
    "1" : "Reforço",
    "2" : "Anulação Parcial",
    "3" : "Anulação Total"
    }
    static readonly TP_PESSOA =
    {
        "1" : "Servidor",
        "2" : "Cidadão",
        "3" : "Prestador de Serviço",
        "4" : "Fornecedor"
    }
}
export type TP_PESSOA =  keyof typeof Constants.TP_PESSOA;
export type TIPO_GUIA_RECOLHIMENTO = keyof typeof Constants.TIPO_GUIA_RECOLHIMENTO
export type TIPO_EMPENHO = keyof typeof Constants.TIPO_EMPENHO;
export type TIPO_OPERACAO_ALTERACAO_EMPENHO = keyof typeof Constants.TIPO_OPERACAO_ALTERACAO_EMPENHO;
export type ESFERA_ORCAMENTARIA = keyof typeof Constants.ESFERA_ORCAMENTARIA;
export type TIPO_ORIGEM_RECURSO = keyof typeof Constants.TIPO_ORIGEM_RECURSO;
export type TP_CLASSIFICACAO = keyof typeof Constants.TP_CLASSIFICACAO;
export type TP_ORIGEM_DOTACAO = keyof typeof Constants.TP_ORIGEM_DOTACAO;
export type GRUPO_FONTERECURSO = keyof typeof Constants.GRUPO_FONTERECURSO;
export type TIPO_PODER_ORGAO = keyof typeof Constants.TIPO_PODER_ORGAO ;