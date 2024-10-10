import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { PagamentoRetencao } from '../../../@types/Despesas';
import { MoneyChip } from '../../MoneyChip';
import { formatDate } from '../../../Utils/dateFormated';
import { Constants, TIPO_GUIA_RECOLHIMENTO } from '../../../Utils/Constants';

export function PagamentoRetencaoRow (props : { row : Partial<PagamentoRetencao>}) {
    const { row } = props;
    return (
        <TableRow >
            <TableCell className='dark:text-zinc-100 text-md'>
                {row.cdPagamentoRetencao}
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right">
                {formatDate(row.dtVencimento!)} 
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right"> 
                {row.nuPercentual ? `${row.nuPercentual}%` : "N/A"}
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align='right'>
                {Constants.TIPO_GUIA_RECOLHIMENTO[ row.tpGuiaRecolhimento?.toString() as  TIPO_GUIA_RECOLHIMENTO] ?? "Sem Guia"} 
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right"> 
                <MoneyChip label={row.vlValor!}/>
            </TableCell>
        </TableRow>
    );
}