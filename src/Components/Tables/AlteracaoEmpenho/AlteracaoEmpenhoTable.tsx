import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../Services/api';
import { ChangeEvent, useEffect, useState } from 'react';
import { Skeleton,  TablePagination } from '@mui/material';
import { AlteraçaoEmpenhoRow } from './AlteracoesEmpenhoRow';
import { PackageOpen } from 'lucide-react';
import { GetEmpenhoAlteracoesResponse } from '../../../@types/DespesasResponse';

export function AlteracaoEmpenhoTable(props : {idEmpenho : number}) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const queryClient = useQueryClient();
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
  const { data : response, isLoading, isSuccess } = useQuery({
    queryFn : async () => {
      const response = await api.get<GetEmpenhoAlteracoesResponse>(`despesas/alteracoesEmpenho?idEmpenho=${props.idEmpenho}&Page=${page+1}&Limit=${rowsPerPage}`);
      console.log(response.data, props.idEmpenho);
      return response.data;
    },
    queryKey : ["get-empenhos-alteracoes"],
    refetchOnWindowFocus : false,
  }); 
  useEffect(() => {
    queryClient.refetchQueries({queryKey : ["get-empenhos-alteracoes"]});
  }, [rowsPerPage , queryClient, page])

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
            <TableCell className='dark:text-zinc-100 text-md font-bold'>Cód.</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Data operação</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Descrição</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Tipo operação</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Valor operação</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Saldo dotação anterior</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Saldo dotação atual</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            response && response.data.length > 0 && (
              <>
                {
                  response.data.map((row) => (
                    <AlteraçaoEmpenhoRow key={row.idAlteracaoEmpenho} row={row} />
                  ))
                }
              </>
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
        isSuccess && response.data.length === 0 && (
          <span className='text-2xl flex items-center gap-2 w-fit absolute z-40 bottom-20 m-auto text-center opacity-70'>
            Nenhuma alteração de empenho foi encontrada... <PackageOpen />
          </span>
        )
      }
      {
        !isLoading && isSuccess && (
          <TablePagination
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
  );
}