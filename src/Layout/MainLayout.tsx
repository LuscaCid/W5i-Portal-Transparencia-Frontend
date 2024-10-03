import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SubHeader } from "./SubHeader";

export function Layout () 
{
    return (
        <div className={`flex dark:black-scrollbar flex-col h-screen w-screen transition-colors duration-150 before:content-[''] before:bg-zinc-200  dark:before:bg-zinc-900 before:w-full before:absolute before:top-0 before:left-0 before:-z-40 before:h-32 before:shadow-lg before:backdrop:blur-md ` }>
            <header className="h-fit">
                <Header />
                <SubHeader />
            </header>
            <main className="overflow-y-auto  w-screen mt-[1.3rem]">
                <Outlet />
            </main>
        </div>
    );   
}