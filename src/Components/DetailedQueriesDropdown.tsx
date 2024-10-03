import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDown } from "lucide-react";
import { useState } from "react"

export const DetailedQueriesDropdown = () => {
    const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  
    return (
    <DropdownMenu.Root
        open = { isOpenDropDown }
        onOpenChange={ setIsOpenDropDown }
    >
        <DropdownMenu.Trigger
            className="p-1 items-center justify-between  flex min-w-[150px] w-full"
        >
            <span>
                abrir
            </span>
            <ChevronDown 
                className={`${isOpenDropDown ? "rotate-90": "rotate-45"}  transition duration-150 ease-out`}
                size={15}
            /> 
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
            <DropdownMenu.Content>
                <DropdownMenu.Item>
                    Item 1
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}