import { Button, Switch, Tooltip } from "@mui/material";
import { Map, Minus, Plus } from 'lucide-react';
import { useThemeContext } from "../Store/Theme";
import { useNavigate } from "react-router-dom";

export function Header ()
{
  const { 
    actualTheme,
    toggleTheme,
    decreaseFontSize, 
    increaseFontSize
  } = useThemeContext(state => ({ 
    actualTheme : state.theme,
    setTheme : state.setTheme,
    decreaseFontSize : state.decreaseFontSize,
    increaseFontSize : state.increaseFontSize,
    toggleTheme : state.toggleTheme
  }));
  const navigate = useNavigate();
  return (
    <header 
      className="w-[95%] m-auto py-4  px-12 border-b bg-zinc-100/80 backdrop-blur-md dark:bg-zinc-700 border-light-gray-border dark:border-b-darkBg shadow-sm flex justify-between items-center"
    >
      <Tooltip
        enterDelay={600}
        leaveDelay={300}
        title= "Voltar para página inicial"
      >
      <span 
        className="text-3xl font-bold select-none text-light-text dark:text-dark-text cursor-pointer hover:dark:bg-zinc-800 transtion duration-150 px-1 rounded-md hover:bg-zinc-200"
        onClick={() => navigate("/")}
      >
        Prefeitura
      </span>
      </Tooltip>
     
      <nav>
        <ul className="flex items-center gap-2 flex-1" >
          <li>
            <span className="text-md dark:text-white font-semibold h-full bg-zinc-50 text-zinc-800 rounded-md px-1 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 flex items-center gap-2 shadow-lg">
              Fonte
              <Tooltip 
                title="Diminuir o tamanho da fonte"
              >
                <Button 
                  onClick={decreaseFontSize}
                  variant="text" 
                  
                >
                  <Minus /> 
                </Button> 
              </Tooltip>
              <Tooltip
                title="Aumentar o tamanho da fonte"
              >
                <Button 
                  onClick={increaseFontSize}
                  variant="text" 
                >
                  <Plus />
                </Button>
              </Tooltip>
             
            </span>
          </li>
          <li >
            <span className="text-md font-semibold shadow-lg bg-zinc-50  dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50 rounded-md px-1 border text-zinc-800  border-zinc-200 flex items-center">
              <span  onClick={toggleTheme} className="select-none cursor-pointer" >Contraste</span>
              <Tooltip
                title="Alterar contraste" 
              >
                <Switch 
                  checked = {actualTheme === "dark"}
                  onClick={toggleTheme} 
                />
              </Tooltip>
             
            </span>
          </li>
          <li>
            <span className="text-md font-semibold h-full dark:text-white bg-zinc-50 text-zinc-800 rounded-md px-1 border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 flex items-center gap-2 shadow-lg">
              Mapa do site
              <Tooltip
                title="Mapa do site"
              >
                <Button
                  variant="text"
                  className="font-semibold"
                >
                  <Map />
                </Button>
              </Tooltip>
              
            </span>
          </li>
        </ul>
      </nav>
    </header>
  ); 
}