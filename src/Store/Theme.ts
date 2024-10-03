import { create } from "zustand";
export enum Theme { light = "light", dark = "dark"};

export const LocalStorageKey = "@portal-transparencia-theme";

interface AcessibilityContext {
    fontSize : number;
    theme: Theme; 
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
}
export const useThemeContext = create<AcessibilityContext>(
    (set, get) => (
        {
            fontSize : 100,
            theme : Theme.light,
            setTheme: (theme : Theme) => set({theme : theme}),
            decreaseFontSize : () => {
                if (get().fontSize >= 30) {
                    document.documentElement.style.fontSize = `${get().fontSize - 10}%`  
                    set({fontSize : get().fontSize - 10})
                }
            },
            increaseFontSize : () => {
                if (get().fontSize <= 200) {
                    document.documentElement.style.fontSize = `${get().fontSize + 10}%`  
                    set({fontSize : get().fontSize + 10})
                }
            },
            toggleTheme : () => {
                if (get().theme ===  Theme.light) 
                { 
                    localStorage.setItem(LocalStorageKey, "dark");
                    set({theme: Theme.dark});
                    document.documentElement.classList.add("dark");
                    document.documentElement.classList.remove("light");
                    return;
                }
                document.documentElement.classList.remove("dark");
                localStorage.setItem(LocalStorageKey, "light");
                set({theme : Theme.light})
            },
        }
    )
);