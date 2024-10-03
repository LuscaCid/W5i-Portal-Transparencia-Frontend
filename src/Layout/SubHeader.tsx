import * as  DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DropdownContainer } from "../Components/DropdownContainer";
import { useNavigate } from "react-router-dom";
import { DropdownItem } from "../Components/DropdownItem";
import { Coins, DollarSign } from "lucide-react";
export function SubHeader() {
    const navigate = useNavigate();

    return (
        <footer className="flex w-[95%] m-auto dark:bg-dark-text bg-zinc-50 items-center px-12 rounded-b-lg ">
            <DropdownContainer triggerButtonTitle="Consultas detalhadas" >
                <DropdownItem  
                onClick={() => navigate("despesas")} 
                    title="Despesas" 
                    icon={DollarSign}
                />
                <DropdownMenu.Separator className="w-full border-b border-zinc-300 dark:border-zinc-700"/>
                <DropdownItem  
                    onClick={() => navigate("orcamentos")}
                    title="Orcamentos"
                    icon={Coins}
                /> 
            </DropdownContainer>
        </footer>
    );
}