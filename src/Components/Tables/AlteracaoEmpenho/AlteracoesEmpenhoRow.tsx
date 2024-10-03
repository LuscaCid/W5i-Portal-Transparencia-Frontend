import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {   AlteracaoEmpenho } from '../../../@types/Despesas';
import { MoneyChip } from '../../MoneyChip';
import { formatDate } from '../../../Utils/dateFormated';
import { Constants, TIPO_OPERACAO_ALTERACAO_EMPENHO } from '../../../Utils/Constants';

export function AlteraçaoEmpenhoRow (props : { row : Partial<AlteracaoEmpenho>}) {
    const { row } = props;
    console.log(row);
    return (
        <TableRow >
            <TableCell className='dark:text-zinc-100 text-md'>
                {row.cdAlteracaoEmpenho}
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right">
                {formatDate(row.dtOperacao!)} 
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right"> 
                {row.dsAlteracaoEmpenho}
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align='right'>
                {Constants.TIPO_OPERACAO_ALTERACAO_EMPENHO[ row.tpOperacaoEmpenho?.toString() as TIPO_OPERACAO_ALTERACAO_EMPENHO]} 
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right"> 
                <MoneyChip label={row.vlOperacao!}/>
            </TableCell>
          
            <TableCell className='dark:text-zinc-100 text-md' align="right">
                <MoneyChip label={row.vlSaldoDotacaoAnterior!}/>  
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align='right'>
                <MoneyChip label={row.vlSaldoDotacaoAtual!}/>  
            </TableCell>
           
        </TableRow>
    );
}