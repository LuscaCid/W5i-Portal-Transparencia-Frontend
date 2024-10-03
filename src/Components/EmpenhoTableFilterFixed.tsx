import { Button, Tooltip } from "@mui/material";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { EmpenhoFilterDialog } from "./Dialogs/EmpenhoFilterDialog";

export function TableEmpenhoFixedFilter () {
    const [ isOpenMenu, setIsOpenMenu ] = useState<boolean>(false);
    
    return (
        <main className="fixed bottom-20 right-5 z-[50]">
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
            <EmpenhoFilterDialog 
                isOpenMenu = {isOpenMenu}
                onClose={() => setIsOpenMenu(false)}
            />
        </main>
    );
}