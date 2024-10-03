import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ItemEmpenho } from '../../../@types/Despesas';
import { MoneyChip } from '../../MoneyChip';

export function ItemEmpenhoRow (props : { row : Partial<ItemEmpenho>}) {
    const { row } = props;
    console.log(row);
    return (
        <TableRow >
            <TableCell className='dark:text-zinc-100 text-md'>
                {row.produtoServico?.cdProdutoServico}
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align='left'>
                {row.produtoServico?.dsDetalhamento}
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="left"> 
                {row.produtoServico?.nmProdutoServico}
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right"> 
                <MoneyChip label={row.vlUnitario!}/>
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align='right'>
                {row.qtItem} 
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align="right">
                <MoneyChip label={row.produtoServico!.vlAtual!}/>  
            </TableCell>
            <TableCell className='dark:text-zinc-100 text-md' align='right'>
                <MoneyChip label={row.vlTotal!}/>  
            </TableCell>
        </TableRow>
    );
}