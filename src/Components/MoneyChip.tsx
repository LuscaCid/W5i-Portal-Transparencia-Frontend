import { Chip } from "@mui/material";

export function MoneyChip ({ label } : { label: number }) {
    return (
        <Chip 
            className='text-md shadow-md' 
            color='success' 
            variant='filled' 
            size='small' 
            label={`${label.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })}`}
        />      
    );
}