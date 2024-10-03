import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {  Button, Chip, Skeleton, TableFooter, TablePagination, Tooltip } from '@mui/material';
import { Liquidacao } from '../../../@types/Despesas';
import { api } from '../../../Services/api';
import { MoneyChip } from '../../MoneyChip';
import { PagamentoDialogDetails } from '../../PagamentoDetailsDialog';
import { formatDate } from '../../../Utils/dateFormated';
import { GetLiquidacaoPagamentosResponse } from '../../../@types/DespesasResponse';

export function LiquidacaoRow (props : { row : Partial<Liquidacao>}) {
    const { row } = props;
    const [ open, setOpen ] = useState(false);
    const [ actualIdSelected, setActualIdSelected ] = useState<number|undefined>(undefined);
    const [ page, setPage ] = useState<number>(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [isOpenDialog, setIsOpenDialog ] = useState(false);
    const queryClient = useQueryClient();
    const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => 
      {
        const newCountOfRows = +event.target.value; 
        setRowsPerPage(newCountOfRows)
        setPage(0) //volta para a primeira pagina ao mudar o numero de linhas por pagina;
      };
    const { data, isSuccess,isFetching } = useQuery({
      queryFn : async () => {
        await new Promise(resolve => setTimeout(resolve, 700))
        const response = await api.get<GetLiquidacaoPagamentosResponse>(`despesas/getliquidacaopagamentos?IdLiquidacao=${actualIdSelected}&Page=${page+1}&Limit=${rowsPerPage}`);
        console.log(response.data);
        return response.data;
      },
      queryKey : [`get-liquidacoes-pagamentos${actualIdSelected}`],
      enabled : open && actualIdSelected != null,
      refetchOnWindowFocus : false,
    });
    useEffect(() => {
      if (!open) {
        queryClient.setQueryData([`get-liquidacoes-pagamentos${actualIdSelected}`], () => []);
      }
    }, [open, actualIdSelected, queryClient]);
    useEffect(() => {
      queryClient.refetchQueries({queryKey : [`get-liquidacoes-pagamentos${actualIdSelected}`]});
    }, [rowsPerPage , queryClient, page, actualIdSelected])
  
    return (
      <React.Fragment>
          <TableRow key={row.nuLiquidacao}>
            <TableCell>
            <Tooltip title={`${open ? "Esconder os pagamentos." : "Abrir os pagamentos desta liquidação."}`}>
              <IconButton
                  className='dark:text-white shadow-md'
                  aria-label="expand row"
                  size="small"
                  onClick={() => {
                    setOpen(!open)
                    setActualIdSelected(row.idLiquidacao);
                  }}
                >
                  {open ? <ChevronUp /> : <ChevronDown />}
                </IconButton>
            </Tooltip>
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md'>{row.nuLiquidacao}</TableCell>
            <TableCell className='dark:text-zinc-100 text-md'>{row.dsHistorico}</TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="center"> 
              <MoneyChip label={row.vlBruto!}/>
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="center"> 
              <MoneyChip label={row.vlLiquido!}/>
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right">
              <MoneyChip label={row.vlLiquidadoPagar!}/>
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align='right'>
              <MoneyChip label={row.vlTotalLiquidado!}/>
            </TableCell>
          </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto">
              <Box sx={{ margin: 2 }}>
                <Typography 
                  className='dark:text-white'
                  variant="h6" 
                  gutterBottom 
                  component="div"
                >
                  Pagamentos da liquidação  <Chip className='text-lg shadow-md' color='info' variant='filled' size='small' label={row.nuLiquidacao}/> 
                </Typography>
             
                <Table size="small" aria-label="Pagamentos " className='bg-zinc-100  rounded-t-md p-2 dark:bg-zinc-800'>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell className='dark:text-zinc-100 text-md font-bold'>N° Pagamento</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold '>Histórico</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold' align='left'>Data do pagamento</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold' align="center">Valor líquido pago</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold' align="center">Valor do pagamento</TableCell>
                      <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Valor retido</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      isSuccess && data.pagamentos && data.pagamentos.length > 0 &&  (
                        <>
                          {
                            data.pagamentos.map((pagamento) => (
                              <TableRow key={pagamento.dtCadastro}>
                                <TableCell>
                                  <Tooltip title="Consultar retenções e estornos deste pagamento.">
                                    <Button 
                                      onClick={() => setIsOpenDialog(true)}
                                      className='rounded-full font-semibold  px-2 py-1' 
                                      variant='outlined'
                                      color='info'>
                                        Detalhar
                                      </Button>
                                  </Tooltip>
                                </TableCell>
                                {
                                  isOpenDialog && (
                                    <PagamentoDialogDetails 
                                      open={isOpenDialog} 
                                      onClose={() => 
                                      setIsOpenDialog(false)} 
                                      pagamento={pagamento!} 
                                    />
                                  )
                                }
                                <TableCell className='dark:text-zinc-100 text-md'>{pagamento.nuPagamento}</TableCell>
                                <TableCell className='dark:text-zinc-100 text-md max-h-[100px] overflow-y-auto max-w-[150px] break-words overflow-auto'>{pagamento.dsHistorico}</TableCell>
                                <TableCell className='dark:text-zinc-100 text-md' align='left'>{formatDate(pagamento.dtPagamento) }</TableCell>
                                <TableCell className='dark:text-zinc-100 text-md'align="center">
                                  <MoneyChip label={pagamento.vlLiquidoPago}/>
                                </TableCell>
                                <TableCell className='dark:text-zinc-100 text-md' align="center">
                                  <MoneyChip label={pagamento.vlPagamento} />
                                </TableCell>
                                <TableCell className='dark:text-zinc-100 text-md' align="right">
                                  <MoneyChip label={pagamento.vlRetido}/> 
                                </TableCell>
                              </TableRow>
                            ))
                          }
                        </>
                      )
                    }
                    {
                      !isFetching && !data && isSuccess && (
                        <TableFooter className='text-lg dark:text-zinc-200 w-fit m-auto opacity-60 text-center'>
                          Nenhum pagamento foi encontrado.
                        </TableFooter>
                      )
                    }
                  </TableBody>
                  
                </Table>
                 {
                    isFetching && (
                      <div className='flex flex-col gap-2 w-full '>
                        {
                          [1,2,3].map((x) => (
                            <Skeleton key={x.toString()} variant='rectangular' className='w-full p-7' />
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