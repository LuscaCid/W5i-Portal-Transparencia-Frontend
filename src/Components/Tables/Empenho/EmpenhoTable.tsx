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
import { Button, Skeleton,  TableFooter,  TablePagination, Tooltip } from '@mui/material';
import { EmpenhoRow } from './EmpenhoRow';
import { delay } from '../../../Utils/delay';
import { AlertCircle, BoxIcon, FilterX, ListFilter } from 'lucide-react';
import { EmpenhoFilterDialog } from '../../Dialogs/EmpenhoFilterDialog';
import { useSearchParams } from 'react-router-dom';
import { GetEmpenhoResponse } from '../../../@types/DespesasResponse';
/**
 * @summary Metodologia para lidar de forma manual com a tabela aninhada, passando de form manual, sem recursao como estava 
 * @returns 
 */
export function EmpenhoTable() {

  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ isOpenMenu, setIsOpenMenu ] = useState(false);
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const queryClient = useQueryClient();
 
  //funcao chamada ao chamar a proxima pagina, ou seja, revalidacao da query, mas passando o valor atualizado da pagina
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>|null, newPage: number) => {
    if (event && event.isTrusted) setPage(newPage)
    setPage(newPage)
  };
  
  //funcao chamada ao fazer a troca da quantidade de linhas por pagina, logo, realizar a query novamente, mas passando uma quantidade maior de limit
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => 
  {
    const newCountOfRows = +event.target.value; 
    setRowsPerPage(newCountOfRows);
    setPage(0); //volta para a primeira pagina ao mudar o numero de linhas por pagina;
  };
  const { data:response , isFetching, isSuccess, isError } = useQuery({
    queryFn : async () => {
      await delay();
      const query = new URLSearchParams();

      query.append("Page", (page+1).toString());
      query.append("Limit", (rowsPerPage).toString());
      query.append("NuEmpenho", searchParams.get("NuEmpenho") ?? "");
      query.append("DataInicial", searchParams.get("DataInicial") ?? "");
      query.append("DataFinal", searchParams.get("DataFinal") ?? "");
      query.append("TotalPago", searchParams.get("TotalPago") ?? "false");
      query.append("VlMinimo", searchParams.get("VlMinimo") ?? "0");

      const response = await api.get<GetEmpenhoResponse>(`despesas/empenhos`, { params : query});
      return response.data;
    },
    queryKey : ["get-empenhos"],
    refetchOnWindowFocus : false,
    retry: 3
  }); 
  useEffect(() => {
    queryClient.refetchQueries({queryKey : ["get-empenhos"]});
  }, [rowsPerPage , queryClient, page, searchParams])

  //manipulacao da paginacao enviada como parametros para component da biblioteca
  const isCleanFiltersDisabled = searchParams.entries().next().value ? false : true;
  
  return (
    <TableContainer 
      sx={{minHeight : 300, position : "relative"}}
      component={Paper} 
      className='rounded-lg border relative  border-zinc-200 dark:border-zinc-700  dark:bg-zinc-800 dark:text-zinc-100 shadow-lg'
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Tooltip  title={ `${isCleanFiltersDisabled ? "Não há filtros para limpar" : "Limpar filtros"} `}>
                <Button
                  onClick={() => setSearchParams({})}
                  className={`group disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <FilterX className={`${isCleanFiltersDisabled ? "text-red-500 opacity-60" : ""} `}/>
                </Button>
              </Tooltip>
            </TableCell>
            <TableCell align='center'>   
              <Tooltip
                title="Abrir menu de filtros para consulta mais detalhada."
              >
                <Button 
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                  variant="contained"
                  color="info"
                  className="flex items-center shadow-lg  justify-center min-w-5 rounded-full self-end p-1 font-bold"
                >
                  <ListFilter />
                </Button> 
              </Tooltip>
              <EmpenhoFilterDialog isOpenMenu ={isOpenMenu} onClose={() => setIsOpenMenu(false)}/>
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold'>N° Empenho</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align='center'>Tipo Empenho</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align='center'>Natureza despesa</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align='center'>Tipo despesa</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="center">Credor</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Liquidado</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Pago</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">A pagar</TableCell>
            <TableCell className='dark:text-zinc-100 text-md font-bold' align="right">Empenhado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            !isFetching && !response && isSuccess && (
              <TableFooter className='text-3xl dark:text-zinc-200 w-fit absolute top-40 left-20 m-auto opacity-60 text-center flex items-center gap-3
              '>
                Nenhum Empenho foi encontrado. <BoxIcon />
              </TableFooter>
            )
          }
          {
            response?.data && response?.data.length > 0 && isSuccess &&  (
              <>
                {
                  response?.data.map((row) => (
                    <EmpenhoRow key={row.nuEmpenho} row={row} />
                  ))
                }
              </>
            )
          }
         
        </TableBody>
      </Table>
      {
        isFetching && (
          <div className='flex flex-col gap-2 dark:bg-zinc-800'>
          {
            [1,2,3,4,5].map((key) => (
              <Skeleton 
                animation="wave" 
                key={key} 
                variant='rectangular' 
                className='dark:bg-zinc-600 p-7'
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
                <>  {args.from} - {args.to} de {response?.count} itens</>
              )
            }
            labelRowsPerPage="Itens por página"
            className='dark:bg-zinc-800 dark:text-zinc-50'
            component="div"
            rowsPerPage={rowsPerPage}
            count={response?.count ?? 0}
            page={page}
            onPageChange={handleChangePage} 
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )
      }
      {
        isError && ( 
          <TableFooter className='absolute top-32 left-32 text-zinc-700 text-2xl flex items-center gap-4'>
            Ocorreu algum problema ao tentar realizar a consulta, tente novamente mais tarde. <AlertCircle size={30} />
          </TableFooter>
        )
      }
   
    </TableContainer>
  );
}