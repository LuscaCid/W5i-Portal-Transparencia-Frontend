import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../Services/api';
import { ChangeEvent, useState } from 'react';
import { Skeleton,  TablePagination } from '@mui/material';
import { ItemEmpenhoRow } from './ItensEmpenhoRow';
import { GetItensEmpenhoResponse } from '../../../@types/DespesasResponse';

export function ItensEmpenhoTable(props : {idEmpenho : number}) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => setRowsPerPage(+event.target.value);

  const { data, isLoading, isSuccess } = useQuery({
    queryFn : async () => {
      const response = await api.get<GetItensEmpenhoResponse>(`despesas/getitensempenho?IdEmpenho=${props.idEmpenho}&Page=${page+1}&Limit=${rowsPerPage}`);
      return response.data;
    },
    queryKey : ["get-itens-empenho"],
    refetchOnWindowFocus : false,
  }); 
  //manipulacao da paginacao enviada como parametros para component da biblioteca
  return (
    <TableContainer 
      sx={{minHeight : 300, position : "relative", maxHeight : 800}}
      component={Paper} 
      className='rounded-lg border border-zinc-200 dark:border-zinc-700 dark:text-zinc-100 shadow-lg'
    >
        <Table 
        aria-label="collapsible table" 
        className='dark:bg-zinc-800 '
    >
        <TableHead>
          <TableRow>
            <TableCell className='dark:text-zinc-100 text-md font-bold'>Cód. Produto</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="left">Detalhamento</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="left">Nome produto/serviço</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Valor unitário</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Qtd. itens</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Valor atual</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Valor total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data?.itensEmpenho && data.itensEmpenho.length > 0 && (
              <>
                {
                  data.itensEmpenho.map((row) => (
                    <ItemEmpenhoRow key={row.idItemEmpenho} row={row} />
                  ))
                }
              </>
            )
          }
          {
            isSuccess && !data && (
              <span className='text-2xl w-fit absolute z-40 bottom-0'>
                Nenhuma alteração de empenho foi encontrada.
              </span>
            )
          }
        </TableBody>
      </Table>
      {
        isLoading && (
          <>
            {
              [1,2,3].map(() => (
                <Skeleton animation="wave" variant='text'/>
              ))
            }
          </>
        )
      }
      {
        !isLoading && isSuccess && (
          <TablePagination
            labelRowsPerPage="Itens por página"
            className='dark:bg-zinc-800 dark:text-zinc-50'
            component="div"
            rowsPerPage={rowsPerPage}
            count={data.count ?? 0}
            page={page}
            onPageChange={handleChangePage} 
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        )
      }
   
    </TableContainer>
  );
}