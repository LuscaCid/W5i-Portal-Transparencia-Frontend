import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton, styled } from "@mui/material";
import { Constants, ESFERA_ORCAMENTARIA, GRUPO_FONTERECURSO, TIPO_PODER_ORGAO, TP_CLASSIFICACAO, TP_ORIGEM_DOTACAO } from "../../Utils/Constants";
import { AlteracaoEmpenhoTable } from "../Tables/AlteracaoEmpenho/AlteracaoEmpenhoTable";
import { ItensEmpenhoTable } from "../Tables/ItemEmpenho/ItensEmpenhoTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatNumberToBrl } from "../../Utils/BRLFormatter";
import { Theme, useThemeContext } from "../../Store/Theme";
import { TitleWithProgress } from "../TitleWithProgress";
import { Dotacao, Empenho } from "../../@types/Despesas";
import { formatDate } from "../../Utils/dateFormated";
import { ReactNode, useEffect } from "react";
import { ChevronUp, X } from "lucide-react";
import { delay } from "../../Utils/delay";
import { api } from "../../Services/api";
import { Mask } from "../../Utils/Masks";
interface Props {
  open : boolean;
  onClose : () => void;
  empenho : Empenho;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    backgroundColor : theme.palette.background.default
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  }));
export function EmpenhoDialogDetails (props : Props){
  // como o component nao possui a capacidade de conceber o classname para estilização da     
  const theme = useThemeContext(state => state.theme);
  const queryClient = useQueryClient();
  const { data : dotacao, isFetching, isSuccess } = useQuery({
    queryKey : ["empenho-dotacao", props.empenho.idEmpenho],
    queryFn : async () => {
      console.log(props.empenho.idEmpenho);
      await delay();
      const response = await api.get<Dotacao>(`despesas/getempenhodotacao?IdDotacao=${props.empenho.idDotacao}`);
      return response.data;
    },
    refetchOnMount : true,
    refetchOnWindowFocus : false,
    refetchOnReconnect : true,
  });
  useEffect(() => {
    if (!open){ 
      queryClient.setQueryData(["empenho-dotacao", props.empenho.idEmpenho], () => null);
    }
  }, [props.open, queryClient, props.empenho.idEmpenho])
  return (
    <BootstrapDialog
      sx={{
        '& .MuiPaper-root': {
          background: `${theme === Theme.dark ? "#262626" : ""}`,
          padding : 1
        },
        '& .MuiDialogContent-root': {
          padding : 3,
          backgroundColor: 'transparent' // Try to remove this to see the result
        }
      }}
      className="dark:black-scrollbar h-full"
      keepMounted={false} 
      onClose={props.onClose} 
      open={props.open} 
      fullWidth 
      maxWidth={"xl"}
    >
      <DialogTitle className="dark:text-zinc-100 shadow-sm ">
        <TitleWithProgress  title={`Detalhamento do empenho de número: ${props.empenho.nuEmpenho}`}/>
      </DialogTitle>
        <DialogContent className="dark: dark:text-zinc-100 flex flex-col gap-7">
          <DialogActions className="absolute top-0 right-0" >
            <Button 
              variant="text"
              color="error"
              onClick={props.onClose}
            >
              <X />
            </Button>
          </DialogActions>
          {
            isSuccess && !isFetching && (
              <>
                <DialogContentText className="grid gap-6   lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">      
                  <GroupValues>
                    <ValueShow valueKey="Valor Empenhado" value={`${formatNumberToBrl(props.empenho.vlEmpenho)}`}/>
                    <ValueShow valueKey="Valor pago" value={`${formatNumberToBrl(props.empenho.vlPago) }`}/>
                    <ValueShow valueKey="Valor a pagar" value={`${formatNumberToBrl(props.empenho.vlSaldoEmpenho) }`}/>
                  </GroupValues>
                  <GroupValues>
                    <ValueShow valueKey="Valor líquidado" value={`${formatNumberToBrl(props.empenho.vlLiquidado) }`}/>
                    <ValueShow valueKey="Valor compromisso"  value={`${formatNumberToBrl(props.empenho.vlCompromisso) }`}/>
                    <ValueShow valueKey="Data Empenho"  value={formatDate(props.empenho.dtEmpenho)}/>
                  </GroupValues>
                  <GroupValues>
                    <ValueShow valueKey="Valor Reforçado" value={`${formatNumberToBrl(props.empenho.vlReforco) }`}/>
                    <ValueShow valueKey="Saldo dotação atual" value={`${formatNumberToBrl(props.empenho.vlSaldoDotacaoAtual) }`}/>
                    <ValueShow valueKey="Saldo dotação anterior" value={`${formatNumberToBrl(props.empenho.vlSaldoDotacaoAnterior) }`}/>
                  </GroupValues>
                </DialogContentText>
                <DialogContentText>
                  <TitleWithProgress title=" Detalhes orçamentários"/>
                </DialogContentText>
                  <DialogContentText className="flex flex-col">      
                    <Accordion className="dark:bg-zinc-700 bg-zinc-100 p-1 shadow-md" >
                      <AccordionSummary
                        className="dark:bg-zinc-800 rounded-t group"
                        expandIcon={<ChevronUp className="dark:text-zinc-50"/>}
                        id="dotacao"
                      >
                        <TitleWithProgress title="Dotação"/>
                      </AccordionSummary>
                      <AccordionDetails className="dark:text-zinc-50 lg:w-2/3 sm:w-full flex flex-col gap-1">
                        {/* onde os dados vao entrar */}
                        <ValueShow valueKey={"Código"} value={dotacao.cdDotacao}/>
                        <ValueShow valueKey={"Fonte Recurso"} value={dotacao.fonteRecurso.nmFonteRecurso}/>
                        <ValueShow valueKey={"Tipo origem"} value={Constants.TP_ORIGEM_DOTACAO[dotacao.tpOrigem.toString() as TP_ORIGEM_DOTACAO] }/>
                        <ValueShow valueKey={"Especificação"} value={dotacao.fonteRecurso.dsEspecificacao}/>
                        <ValueShow valueKey={"Tipo grupo fonte"} value={Constants.GRUPO_FONTERECURSO[dotacao.tpGrupoFonte.toString() as GRUPO_FONTERECURSO]}/>
                        <ValueShow valueKey={"Grupo fonte recurso"} value={dotacao.fonteRecurso.nmGrupo}/>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className="dark:bg-zinc-700 bg-zinc-100 p-1 shadow-md" >
                      <AccordionSummary
                        className="dark:bg-zinc-800 rounded-b group"
                        expandIcon={<ChevronUp className="dark:text-zinc-50"/>}
                        id="dotacao"
                      >
                        <TitleWithProgress title="Ação orcamentaria"/>
                      </AccordionSummary>
                      <AccordionDetails className="dark:text-zinc-50 lg:w-2/3 sm:w-full flex flex-col gap-1">
                        {/* onde os dados vao entrar */}
                        <ValueShow valueKey={"Órgão responsável"} value={dotacao.acaoOrcamentaria.orgao.nmOrgao}/>
                        <ValueShow valueKey={"Poder Órgão"} value={Constants.TIPO_PODER_ORGAO[dotacao.acaoOrcamentaria.orgao.tpPoder.toString() as TIPO_PODER_ORGAO] }/>
                        <ValueShow valueKey={"Função"} value={dotacao.acaoOrcamentaria.funcao.nomeFuncao}/>
                        {
                          dotacao.acaoOrcamentaria.funcao.dataDesativacao && (
                            <ValueShow valueKey={"Data de desativação da função"} value={ formatDate(dotacao.acaoOrcamentaria.funcao.dataDesativacao )}/>
                          )
                        }
                        <ValueShow valueKey={"SubFunção"} value={dotacao.acaoOrcamentaria.subFuncao.nmSubfuncao}/> 
                        {
                          dotacao.acaoOrcamentaria.funcao.dataDesativacao && (
                            <ValueShow valueKey={"Data de desativação da subfunção"} value={ formatDate(dotacao.acaoOrcamentaria.subFuncao.dtDesativacao )}/>
                          )
                        }
                        <ValueShow 
                          valueKey="Tipo esfera orçamentária" 
                          value={Constants.ESFERA_ORCAMENTARIA[dotacao.acaoOrcamentaria.tpEsferaOrcamentaria.toString() as ESFERA_ORCAMENTARIA]}
                        />
                        <ValueShow valueKey="Valor total da dotação" value={formatNumberToBrl(dotacao.acaoOrcamentaria.vlTotalDotacao)}/>
                        {
                          dotacao.acaoOrcamentaria.unidadeAdmnistrativa && (
                            <>
                              <ValueShow valueKey="CNPJ unidade administrativa" value={dotacao.acaoOrcamentaria.unidadeAdmnistrativa.nuCnpj}/>
                              <ValueShow valueKey="Unidade admnistrativa" value={dotacao.acaoOrcamentaria.unidadeAdmnistrativa.nmUnidadeAdministrativa}/>
                            </>
                          )
                        }
                            {
                              dotacao.acaoOrcamentaria.unidadeOrcamentaria && (
                              <>
                              {
                                dotacao.acaoOrcamentaria.unidadeOrcamentaria.nuCnpj && (
                                  <ValueShow valueKey="CNPJ unidade Orçamentária" value={dotacao.acaoOrcamentaria.unidadeOrcamentaria.nuCnpj}/>
                                ) 
                              }
                                <ValueShow valueKey="Unidade Orçamentária" value={dotacao.acaoOrcamentaria.unidadeOrcamentaria.nmUnidade}/>
                                <ValueShow valueKey="Tipo Classificação" value={Constants.TP_CLASSIFICACAO[dotacao.acaoOrcamentaria.unidadeOrcamentaria.tpClassificacao.toString() as  TP_CLASSIFICACAO]}/>
                              </>
                              )
                          }
                        </AccordionDetails>
                      </Accordion>
                      <Accordion className="dark:bg-zinc-700 bg-zinc-100 p-1 shadow-md" >
                          <AccordionSummary
                              className="dark:bg-zinc-800 rounded-b group"
                              expandIcon={<ChevronUp className="dark:text-zinc-50"/>}
                              id="Dados do credor"
                          >
                              <TitleWithProgress title="Dados do credor"/>
                          </AccordionSummary>
                        <AccordionDetails className="dark:text-zinc-50 lg:w-2/3 sm:w-full flex flex-col gap-1">
                          {/* onde os dados vao entrar */}
                          {
                              props.empenho.pessoaFisica ? (
                                  <>
                                      <ValueShow valueKey={"Nome do credor"} value={props.empenho.pessoaFisica.nmPessoaFisica}/>
                                      <ValueShow valueKey={"CPF do credor"} value={Mask.Cpf( props.empenho.pessoaFisica.nuCPF)}/>
                                      <ValueShow valueKey={"Tipo pessoa"} value={Constants.TP_PESSOA[props.empenho.pessoaFisica.tpPessoa] }/>
                                      {
                                          props.empenho.pessoaFisica.dsEmail && (
                                              <ValueShow valueKey={"E-mail"} value={props.empenho.pessoaFisica.dsEmail}/>
                                          )
                                      }
                                  </>
                              ) : (
                                  <>
                                      <ValueShow valueKey={"Razão social"} value={props.empenho.pessoaJuridica!.nmRazaoSocial}/>
                                      {
                                          props.empenho.pessoaJuridica?.nmFantasia && (
                                              <ValueShow valueKey={"Nome fantasia"} value={props.empenho.pessoaJuridica!.nmFantasia}/>
                                          )
                                      }
                                      <ValueShow valueKey={"CNPJ do credor"} value={Mask.Cnpj(props.empenho.pessoaJuridica!.nuCNPJ)}/>
                                  </>
                              )
                          }
                        </AccordionDetails>
                    </Accordion>
                  </DialogContentText>
                  <TitleWithProgress 
                    title="Itens de empenho"
                  />
                    <ItensEmpenhoTable idEmpenho={props.empenho.idEmpenho} />
                  <TitleWithProgress 
                    title="Alterações de empenho"
                  />
                  <AlteracaoEmpenhoTable idEmpenho={props.empenho.idEmpenho} />
                </>
              )
          }
          {
              isFetching && (
                <>
                  {
                    <section className="flex flex-col gap-3 h-full">  
                      <div className=" gap-2 w-full  grid grid-cols-3  h-full lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                      { 
                        [1,2,3].map(
                            () => (
                            <section className="flex flex-col gap-3">
                              <Skeleton variant="rectangular" className="p-3 rounded-md" animation="wave"/>
                              <Skeleton variant="rectangular" className="p-3 rounded-md" animation="wave"/>
                              <Skeleton variant="rectangular" className="p-3 rounded-md" animation="wave"/>
                            </section>
                          )
                        )
                      }
                      </div>
                      <Skeleton variant="rectangular" className="md:w-[300px] lg:w-[400px] p-4 rounded-md shadow-md   mt-6 "/>
                        <div className="flex flex-col gap-1">
                          <Skeleton variant="rectangular" className="p-8 "/>
                          <Skeleton variant="rectangular" className="p-8 "/>
                          <Skeleton variant="rectangular" className="p-8 "/>
                        </div>
                      <Skeleton variant="rectangular" className="md:w-[300px] lg:w-[400px] p-4 rounded-md shadow-md   mt-6"/>
                    </section>   
                  }
                </>
              )
          }
      </DialogContent>
    </BootstrapDialog>
  );
}

function ValueShow (props : { valueKey : string; value : string|number }) {
  return (
    <section className="pb-1 border-b border-zinc-300 dark:border-zinc-600 flex w-full justify-between">
      <strong className="font-bold text-zinc-900 dark:text-zinc-50">
        {props.valueKey}
      </strong>
      <span className="text-zinc-600 dark:text-zinc-400 text-right">
        {props.value}
      </span>
    </section>
  );
}

function GroupValues ({children} : { children : ReactNode}) {
  return (
    <section className="flex flex-col gap-1">
      {children}
    </section>
  );
}