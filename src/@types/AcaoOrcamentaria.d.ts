
export interface AcaoOrcamentaria {
    idAcaoOrcamentaria: number
    idBancoAcao: number
    idAcaoPrograma: number
    tpEsferaOrcamentaria: number
    idUnidadeOrcamentaria: number
    idFuncao: number
    idSubFuncao: number
    tpOrigem: number
    vlTotalDotacao: number
    dtCadastro: string
    dtAlteracao: string
    dtAno: string
    idUnidadeAdministrativa: number
    idOrgao: number
    dtAnoMes: number
    dtMes: string
    idEntidade: number
    cdControle: number
    orgao: Orgao
    funcao: Funcao
    subFuncao: SubFuncao
    unidadeOrcamentaria: UnidadeOrcamentaria
    unidadeAdmnistrativa: UnidadeAdmnistrativa
}
export interface SubFuncao {
    idSubfuncao: number
    cdSubfuncao: string
    nmSubfuncao: string
    dtDesativacao: string
    dtCadastro: string
    dtAlteracao: string
}

export interface UnidadeOrcamentaria {
    idUnidadeOrcamentaria: number
    idOrgao: number
    cdUnidadeOrcamentaria: string
    nmUnidade: string
    dtCriacao: string
    tpClassificacao: number
    flFundo: boolean
    idAmparoLegal: number
    nuCnpj: string
    dtExtincao: string
    cdUnidadeGestora: string
    dtCadastro: string
    dtAlteracao: string
    dtAno: number
    dtMes: string
    dtAnoMes: number
    idEntidade: number
    tpPoderOrgao: number
}

export interface UnidadeAdmnistrativa {
    idUnidadeAdministrativa: number
    idUnidadeOrcamentaria: number
    cdUnidadeAdministrativa: string
    nmUnidadeAdministrativa: string
    dtCriacao: string
    flUnidadeGestora: boolean
    nuCnpj: string
    idAmparoLegal: number
    dtCadastro: string
    dtAlteracao: string
    dtExtincao: string
    dtAno: number
    dtMes: string
    dtAnoMes: number
    idEntidade: number
}

export interface Funcao {
    idFuncao: number
    codigoFuncao: string
    nomeFuncao: string
    dataDesativacao: string
    dtCadastro: string
    dtAlteracao: string
}
export interface Orgao {
    idOrgao: number
    cdOrgao: string
    nmOrgao: string
    dtCriacao: string
    tpPoder: number
    tpClassificacao: number
    dtExtincao: string
    dtCadastro: string
    dtAlteracao: string
}
