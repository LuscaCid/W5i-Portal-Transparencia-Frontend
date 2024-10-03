import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react"
interface DrowdownMenuProps {
    children : ReactNode;
    triggerButtonTitle : string; 
}
/**
 * Summary : Funcao que vai encapsular os futuros dropdowns da aplicacao como um todo, passando para dentro como children os 'DropdownMenu.item' .
 * @param param0 
 * @returns 
 */
export const DropdownContainer = ( {children, triggerButtonTitle} : DrowdownMenuProps ) => {
    const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  
    return (
    <DropdownMenu.Root
        onOpenChange={ setIsOpenDropDown }
    >
        <DropdownMenu.Trigger
            className="p-1 items-center justify-between focus:outline-none flex min-w-[210px] dark:bg-dark-text bg-light-text hover:dark:bg-blue-600 transition duration-150"       
        >
            <span className="text-white font-semibold text-md">
                {triggerButtonTitle}
            </span>
            <ChevronDown 
                className={`${isOpenDropDown ? "rotate-180": "rotate-0"} text-white  transition duration-150 ease-out`}
                size={16}
            /> 
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
            <DropdownMenu.Content
                className="rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade w-[200px] border border-zinc-200 bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white flex flex-col gap-1 mt-2"
            >
                {children}
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}