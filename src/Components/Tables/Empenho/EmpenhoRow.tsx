import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ChevronDown, ChevronUp, Ellipsis } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../Services/api';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Chip, Skeleton, TablePagination, Tooltip } from '@mui/material';
import { Empenho } from '../../../@types/Despesas';
import { MoneyChip } from '../../MoneyChip';
import { EmpenhoDialogDetails } from '../../Dialogs/EmpenhoDialogDetails';
import { Constants, TIPO_EMPENHO } from '../../../Utils/Constants';
import { LiquidacaoRow } from '../Liquidacao/LiquidacaoRow';
import { delay } from '../../../Utils/delay';
import { useSearchParams } from 'react-router-dom';
import { GetEmpenhoLiquidacoesResponse } from '../../../@types/DespesasResponse';


export function EmpenhoRow(props: { row: Empenho }) {
    const { row } = props;
    const [ open, setOpen ] = useState(false);
    const [ actualIdSelected, setActualIdSelected ] = useState<number|undefined>(undefined);
    const [ page, setPage ] = useState<number>(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ isOpenDialog, setIsOpenDialog ] = useState(false);
    const queryClient = useQueryClient();
    const [ searchParams ] = useSearchParams();
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>|null, newPage: number) => {
      if (event && event.isTrusted){ 
        setPage(newPage)
        return
      }
      setPage(newPage)
    };
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => 
    {
      const newCountOfRows = +event.target.value; 
      setRowsPerPage(newCountOfRows)
      setPage(0) //volta para a primeira pagina ao mudar o numero de linhas por pagina;
    };
    const { data, isSuccess,isFetching } = useQuery({
      queryFn : async () => {
        await delay();
        const query = new URLSearchParams();

        query.append("Page", (page+1).toString());
        query.append("Limit", (rowsPerPage).toString());
        query.append("IdEmpenho", actualIdSelected!.toString());
        
        const response = await api.get<GetEmpenhoLiquidacoesResponse>(`despesas/getempenholiquidacoes`, { params : query});
        return response.data;
      },
      queryKey : [`get-empenhos-liquidacoes${actualIdSelected}`],
      enabled : open && actualIdSelected != null,
      refetchOnWindowFocus : false,
    });
    useEffect(() => {
      if (!open) {
        queryClient.setQueryData([`get-empenhos-liquidacoes${actualIdSelected}`], () => []);
      }
    }, [open, actualIdSelected, queryClient])
    useEffect(() => {
      queryClient.refetchQueries({queryKey : [`get-empenhos-liquidacoes${actualIdSelected}`]});
    }, [rowsPerPage , queryClient, page,actualIdSelected, searchParams]);
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'none' } }}>
          <TableCell>
            <Tooltip title={`${open ? "Esconder as liquidações." : "Abrir liquidacoes deste empenho."}`}>
              <IconButton
                className='dark:text-white shadow-md'
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setOpen(!open)
                  setActualIdSelected(row.idEmpenho);
                }}
              >
                {open ? <ChevronUp /> : <ChevronDown />}
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell>
            <Tooltip title="Detalhar dados da dotação deste empenho.">
              <IconButton 
                onClick={() => setIsOpenDialog(true)}
                className='rounded-full font-semibold' 
                color='info'
              >
                <Ellipsis />
              </IconButton>
            </Tooltip>
            {
              isOpenDialog && (
                <EmpenhoDialogDetails open={isOpenDialog} onClose={() => setIsOpenDialog(false)} empenho={row!} />
              )
            }
          </TableCell>
          <TableCell className='dark:text-zinc-100'>
            {row.nuEmpenho}
          </TableCell>
          <TableCell align='center' className='dark:text-zinc-100'>
            {Constants.TIPO_EMPENHO[row.tpEmpenho.toString() as TIPO_EMPENHO]}
          </TableCell>
          <TableCell align='center' className='dark:text-zinc-100'>
            {row.naturezaDespesa.nmNaturezaDespesa}
          </TableCell>
          <TableCell align='center' className='dark:text-zinc-100'>
            {row.tipoDespesa.nmTipoDespesa}
          </TableCell>
          <TableCell align='center' className='dark:text-zinc-100'>
            {row.pessoaFisica ? row.pessoaFisica?.nmPessoaFisica: row.pessoaJuridica?.nmFantasia ?? row.pessoaJuridica?.nmRazaoSocial}
          </TableCell>
          <TableCell className='dark:text-zinc-100' align="right">
            <MoneyChip label={row.vlLiquidado!}/>
          </TableCell>
          <TableCell className='dark:text-zinc-100' align="right">
            <MoneyChip label={row.vlPago!}/>
          </TableCell>
          <TableCell className='dark:text-zinc-100' align="right">
            <MoneyChip label={row.vlSaldoEmpenho!}/>
          </TableCell>
          <TableCell className='dark:text-zinc-100' align="right">
            <MoneyChip label={row.vlEmpenho!}/>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 4 }}>
                <Typography 
                  className='dark:text-white'
                  variant="h6" 
                  gutterBottom 
                  component="div"
                >
                  Liquidações do empenho  <Chip className='text-lg shadow-md' color='info' variant='filled' label={row.nuEmpenho}/> 
                </Typography>
             
                <Table size="medium" aria-label="purchases " className='bg-zinc-50 rounded-md p-2 dark:bg-zinc-700'>
                  <TableHead>
                    <TableRow >
                      <TableCell />
                      <TableCell className='dark:text-zinc-100 text-md font-bold'>N° Liquidação</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold'>Histórico</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold' align="center">Valor bruto</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold' align="center">Líquido</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Valor a pagar</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold' align='right'>Total liquidado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className='relative min-h-[300px]'>
                    {
                      isSuccess && data.liquidacoes && data.liquidacoes.length > 0 &&  (
                        <>
                          {
                            data.liquidacoes.map((liquidacao) => (
                              <LiquidacaoRow key={liquidacao.nuLiquidacao} row={liquidacao}/>
                            ))
                          }
                        </>
                      )
                    }
                    {
                      !isFetching && !data && isSuccess && (
                        <span className='text-2xl w-fit m-auto opacity-60 text-center'>
                          Nenhuma liquidação foi encontrada.
                        </span>
                      )
                    }
                  </TableBody>
                  
                </Table>
                {
                    isFetching && (
                      <div className='flex flex-col gap-2 w-full '>
                        {
                          [1,2,3].map((x) => (
                            <Skeleton 
                              key={x.toString()} 
                              variant='rectangular' 
                              className='w-full dark:bg-zinc-700 bg-zinc-300 p-7' 
                            />
                          ))
                        }
                      </div>
                    )
                  }
                {
                  !isFetching && isSuccess && (
                    <TablePagination
                    labelDisplayedRows={
                      (args) => (
                        <>  {args.from} - {args.to} de {data.count} itens</>
                      )
                    }
                      labelRowsPerPage="Itens por página"
                      className='dark:bg-zinc-800 dark:text-zinc-50'
                      component="div"
                      rowsPerPage={rowsPerPage}
                      count={data.count ??0}
                      page={page}
                      onPageChange={handleChangePage} 
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  )
                }
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  