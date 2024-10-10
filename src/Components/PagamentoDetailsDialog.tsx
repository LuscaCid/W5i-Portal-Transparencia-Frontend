import { Button, Chip, Dialog, DialogActions, DialogContent,DialogTitle,styled } from "@mui/material";
import { Pagamento } from "../@types/Despesas";
import {  X } from "lucide-react";
import { Theme, useThemeContext } from "../Store/Theme";
import { useQueryClient } from "@tanstack/react-query";
import {  useEffect } from "react";
import { EstornoPagamentoTable } from "./Tables/EstornoPagamento/EstornoPagamentoTable";
import { PagamentoRetencaoTable } from "./Tables/PagamentoRetencao/RetencaoPagamentoTable";
import { TitleWithProgress } from "./TitleWithProgress";

interface Props {
    open : boolean;
    onClose : () => void;
    pagamento : Pagamento;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      backgroundColor : theme.palette.background.default
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));
export function PagamentoDialogDetails (props : Props){
    // como o component nao possui a capacidade de conceber o classname para estilização da     
    const theme = useThemeContext(state => state.theme);
    const queryClient = useQueryClient();
    useEffect(() => {
        if (!open){ 
            queryClient.setQueryData(["get-pagamento-retencoes"], () => null);
            queryClient.setQueryData(["get-pagamento-estornos"], () => null);
        }
    }, [props.open, queryClient, props.pagamento._id])
    return (
        <BootstrapDialog
            sx={{
                '& .MuiPaper-root': {
                    background: `${theme === Theme.dark ? "#262626" : ""}`,
                    padding : 1
                },
                '& .MuiDialogContent-root': {
                    padding : 3,
                    backgroundColor: 'transparent' // Try to remove this to see the result
                }
            }}
            className="dark:black-scrollbar shadow-md"
            keepMounted={false} 
            onClose={props.onClose} 
            open={props.open} 
            fullWidth 
            maxWidth={"xl"}
        >
            <DialogTitle className="dark:text-zinc-50 flex items-center gap-2 shadow-sm">
                <TitleWithProgress title="Detalhamento do pagamento "/>
                <Chip 
                    className="text-lg select-none"
                    color="info"
                    variant="filled" 
                    label={`${props.pagamento.nuPagamento}`}
                />
            </DialogTitle>
            <DialogContent className="dark: dark:text-zinc-100 flex flex-col gap-7">
                
                <DialogActions className="absolute top-0 right-0" >
                    <Button 
                        variant="text"
                        color="error"
                        onClick={props.onClose}
                    >
                        <X />
                    </Button>
                </DialogActions>
                <main className="flex flex-col gap-3 ">
                    <EstornoPagamentoTable idPagamento={props.pagamento._id}/>
                    <PagamentoRetencaoTable idPagamento={props.pagamento._id}/>
                </main>
            </DialogContent>
        </BootstrapDialog>
    );
}
