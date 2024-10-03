import { TP_PESSOA } from "../Utils/Constants";

export interface PessoaJuridica {
    idPessoaJuridica: number;     
    nuCNPJ: string;               
    nmRazaoSocial: string;        
    nmFantasia: string;           
    nuTelefone?: string;          
    dsEmail?: string;             
    nuCEP?: string;               
    nmLogradouro?: string;        
    dsComplemento?: string;       
    nuEndereco?: string;          
    nmBairro?: string;            
    idCidade: number;             
    idEstado: number;             
    dtCadastro?: Date;            
    dtAlteracao?: Date;           
    flOrgaoEmissor: boolean;      
    nuCNES?: string;              
    idCNAEPrincipal?: number;     
    idNaturezaJuridica?: number;  
}
export interface PessoaFisica {
    idPessoaFisica: number;       
    tpPessoa: TP_PESSOA;             
    nmPessoaFisica: string;       
    nuCPF: string;                
    dtCadastro: Date;             
    dtAlteracao?: Date;           
    flProfissional?: boolean;     
    idCargo?: number;             
    nuRegistroInterno?: number;   
    nuTelefone?: string;          
    dsEmail?: string;             
    tpSexo: string;               
}