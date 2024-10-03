import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import { Despesas } from "../Pages/Despesas";
import { Layout } from "../Layout/MainLayout";
import { useEffect } from "react";
import { LocalStorageKey, Theme, useThemeContext } from "../Store/Theme";
import { Orcamentos } from "../Pages/Orcamentos";

export function ApplicationRouter () {
    const setTheme = useThemeContext(state => state.setTheme);
    useEffect(() => {
        const actualTheme = localStorage.getItem(LocalStorageKey);
        if (actualTheme && actualTheme == "dark") 
        {
            document.querySelector("html")?.classList.add("dark");
            setTheme(Theme.dark);
            return ;
        }
        document.querySelector("html")?.classList.add("light");
        setTheme(Theme.light);
    }, [setTheme]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={< HomePage/>}/> 
                    <Route path="/despesas" element={< Despesas/>}/> 
                    <Route path="/orcamentos" element={< Orcamentos/>}/> 
                </Route>
            </Routes>
        </BrowserRouter>
    );
} 