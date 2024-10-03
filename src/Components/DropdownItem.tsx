import * as DropdowmMenu from "@radix-ui/react-dropdown-menu";
import { LucideIcon } from "lucide-react";

interface Props {
    onClick : (event :  React.MouseEvent<HTMLDivElement>) => void;
    title : string;
    icon? : LucideIcon
}
export function DropdownItem ({ onClick, title, icon : ICon } : Props) {

    return (
        <DropdowmMenu.Item
            onClick={onClick}
            className="cursor-pointer hover:focus:outline-none px-2  hover:bg-blue-400 rounded-sm flex items-center justify-between transition duration-150 hover:dark:bg-blue-600"
        >
            <span className="text-md font-semibold ">
                {title}
            </span>
            { ICon && (
                <span>
                    <ICon size={16}/>
                </span>
            )}
        </DropdowmMenu.Item>
    );
}