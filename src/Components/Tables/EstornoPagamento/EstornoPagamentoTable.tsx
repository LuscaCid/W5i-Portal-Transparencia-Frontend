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
import { TablePagination } from '@mui/material';
import { PackageOpen } from 'lucide-react';
import { EstornoPagamentoRow } from './EstornoPagamentoRow';
import { TableSkeleton } from '../TableSkeleton';
import { TitleWithProgress } from '../../TitleWithProgress';
import { delay } from '../../../Utils/delay';
import { GetEstornoPagamentosResponse } from '../../../@types/DespesasResponse';

export function EstornoPagamentoTable(props : {idPagamento : number}) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>|null, newPage: number) => {
    if (event && event.isTrusted){ 
      setPage(newPage)
      return
    }
    setPage(newPage)
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => 
  {
    setRowsPerPage(+event.target.value);
  };
  const { data: response, isFetching, isSuccess } = useQuery({
    queryFn : async () => {
      await delay();
      const response = await api.get<GetEstornoPagamentosResponse>(`despesas/estornosPagamento?idPagamento=${props.idPagamento}&Page=${page+1}&Limit=${rowsPerPage}`);
      console.log(response.data);
      return response.data;
    },
    queryKey : ["get-pagamento-estornos"],
    refetchOnWindowFocus : false,
  }); 
  
  //manipulacao da paginacao enviada como parametros para component da biblioteca
  return (
    <main className='flex flex-col gap-3'>
      <TitleWithProgress title='Estornos'/>
      <TableContainer 
      sx={{minHeight : 250, position : "relative", maxHeight : 800}}
      component={Paper} 
      className='rounded-lg border border-zinc-200 dark:border-zinc-700 dark:text-zinc-100 shadow-lg'
    >
      
      <Table 
        aria-label="collapsible table" 
        className='dark:bg-zinc-800 '
      >
        <TableHead>
          <TableRow>
            <TableCell className='dark:text-zinc-100 text-md font-bold'>Cód. Estorno</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Data operação</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Descrição</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Estorno parcial</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Valor Estorno</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            response?.data && response?.data .length > 0 && (
              <>
                {
                  response?.data.map((row) => (
                    <EstornoPagamentoRow key={row.idEstornoPagamento} row={row} />
                  ))
                }
              </>
            )
          }
        </TableBody>
      </Table>
      {
        isFetching && (
          <TableSkeleton />
        )
      }
      {
        !isFetching && isSuccess && response.data.length == 0 && (
          <span className='text-2xl flex items-center gap-2 w-fit absolute z-40 top-32 left-32 m-auto text-center opacity-70'>
            Nenhum estorno deste pagamento foi encontrado... <PackageOpen />
          </span>
        )
      }
      {
        !isFetching && isSuccess && (
          <TablePagination
            labelDisplayedRows={
              (args) => (
              <>  {args.from} - {args.to} de {response.count} itens</>
              )
            }
            labelRowsPerPage="Itens por página"
            className='dark:bg-zinc-800 dark:text-zinc-50'
            component="div"
            rowsPerPage={rowsPerPage}
            count={response.count ?? 0}
            page={page}
            onPageChange={handleChangePage} 
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        )
      }
    </TableContainer>
  </main>
  );
}