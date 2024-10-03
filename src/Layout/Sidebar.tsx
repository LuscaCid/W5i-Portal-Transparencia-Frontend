import Switch from "@mui/material/Switch";

export function Sidebar () {

    function toggleContrast () {
        //tratativa para lidar com contrast para o usuario com problemas de visao...
    }
    return (
        <nav className="flex flex-col gap-2 p-3">
            <li>
                
            </li>
            <li></li>
            <li></li>
            <Switch onClick={toggleContrast} key={"a"} />
        </nav>
    );
}