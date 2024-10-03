import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { EstornoPagamento } from '../../../@types/Despesas';
import { MoneyChip } from '../../MoneyChip';
import { formatDate } from '../../../Utils/dateFormated';

export function EstornoPagamentoRow (props : { row : Partial<EstornoPagamento>}) {
    const { row } = props;
    console.log(row.flEstornoParcial);
    return (
        <TableRow >
            <TableCell className='dark:text-zinc-100 text-md'>
                {row.cdEstornoPagamento}
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right">
                {formatDate(row.dtEstornoPagamento!)} 
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right"> 
                {row.dsEstornoPagamento}
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align='right'>
                {row.flEstornoParcial ? "Sim" : "Não"} 
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right"> 
                <MoneyChip label={row.vlEstornoPagamento!}/>
            </TableCell>
        </TableRow>
    );
}