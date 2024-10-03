import { Button, Dialog, DialogActions, Input, styled, Switch, Tooltip,  } from "@mui/material";
import { Search, X } from "lucide-react";
import { Theme, useThemeContext } from "../../Store/Theme";
import { TitleWithProgress } from "../TitleWithProgress";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
interface FormTypeSchema {
    InitialDate? : string;
    EndDate? : string;
    NuEmpenho? : string;
    VlMinimo? : number;
    TotalmentePago? : boolean;
};
type keyofForm = keyof FormTypeSchema;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      backgroundColor : theme.palette.background.default
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));
interface Props {
    onClose : () => void;
    isOpenMenu : boolean;
}
/**
 * @Summary Formulario suspenso para envio de informacoes para filtragem dos empenhos de acordo com a necessidade
 * @returns 
 */
export function EmpenhoFilterDialog ({ isOpenMenu, onClose } : Props) {
    const [, setSearchParams ] = useSearchParams();
    
    const theme = useThemeContext(state => state.theme);
    const { register, handleSubmit, setValue, watch } = useForm<FormTypeSchema>();
    const totalPaydWatched = watch("TotalmentePago"); 
    /**
     * @summary : Metodo que vai enviar os dados à query para que haja a consulta mais detalhada dos empenhos
     * @param data 
     */
    const handleSubmitForm = (data : FormTypeSchema) => {
        const entriesFromQuery = Object.keys(data);
        const searchParams = new URLSearchParams();
        entriesFromQuery.forEach((key) =>{
            if(data[key as keyofForm]){
                searchParams.append(key, data[key as keyofForm]!.toString());
            }
        });
        setSearchParams(searchParams);
        onClose();
    };
    return(
        <BootstrapDialog 
            sx={{
                '& .MuiPaper-root': {
                    background: `${theme === Theme.dark ? "#262626" : ""}`,
                    padding : 2
                },
                '& .MuiDialogContent-root': {
                    padding : 3,
                    backgroundColor: 'transparent' // Try to remove this to see the result
                }
            }}
            className="dark:black-scrollbar"
            keepMounted={false} 
            onClose={onClose} 
            open={isOpenMenu} 
            fullWidth 
            maxWidth={"md"}
        >
            <DialogActions className="absolute top-0 right-0 z-50" >
                <Button 
                    variant="text"
                    color="error"
                    onClick={onClose}
                >
                    <X />
                </Button>
            </DialogActions>
            <div 
                className="w-full overflow-hidden  gap-10 flex items-center"
            >
                <form 
                    onSubmit={handleSubmit(handleSubmitForm)} 
                    className={`dark:text-zinc-50  flex flex-col gap-5 ${isOpenMenu ? "w-full translate-x-0 opacity-100" : " -translate-x-52 opacity-60"} transition duration-150`}
                >
                    <TitleWithProgress title="Filtros"/>
                    <section className="grid grid-cols-3 gap-4">
                        <fieldset className="flex flex-col w-full gap-1">
                            <label htmlFor="initial-date" className="font-semibold text-md">
                                Data de ínicio: 
                            </label>
                            <Input
                                {...register("InitialDate")}
                                color="info"
                                type="date" id="initial-date" 
                                className="dark:text-white w-full"
                            />
                        </fieldset>
                        <fieldset className="flex flex-col w-full gap-1">
                            <label htmlFor="end-date" className="font-semibold text-md">Data de Fim: </label>
                            <Input
                                {...register("EndDate")}
                                color="info"
                                type="date" id="end-date" 
                                className="dark:text-white"
                            />
                        </fieldset>
                        <fieldset className="flex flex-col w-full gap-1">
                            <label htmlFor="nu-empenho" className="font-semibold text-md">Número Empenho: </label>
                            <Input
                                {...register("NuEmpenho")}
                                placeholder="ex: 01/2024"
                                color="info"
                                type="text" 
                                id="nu-empenho" 
                                className="dark:text-white w-full"
                            />
                        </fieldset>
                        <fieldset className="flex flex-col w-full gap-1">
                            <label htmlFor="vl-min" className="font-semibold text-md">Valor mínimo: </label>
                            <Input
                                {...register("VlMinimo")}
                                placeholder="ex: R$ 2000,00"
                                color="info"
                                type="number"
                                id="vl-min" 
                                className="dark:text-white w-full"
                            />
                        </fieldset>
                        <fieldset className="flex flex-col w-full gap-1">
                            <label htmlFor="totalmente-pagos" className="font-semibold text-md">Trazer apenas os totalmente pagos: </label>
                            <Switch 
                                {...register("TotalmentePago")}
                                onClick={() => setValue("TotalmentePago", !totalPaydWatched)}
                                color="info" 
                                id="totalmente-pagos" 
                            />
                        </fieldset>
                    </section>
                   
                    <Tooltip title="Buscar Empenhos pelos filtros">
                        <Button 
                            type="submit" 
                            variant="text"
                            color="info"
                            className="flex items-center shadow-lg gap-3  justify-center min-w-5 self-end p-1 font-bold"
                        >
                            Filtrar <Search/>
                        </Button>
                    </Tooltip>
                </form>
            </div>
    </BootstrapDialog>
    );
}
