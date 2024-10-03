import { ReactNode } from "react";

interface Props {
    children : ReactNode
}
export function ContentWrapper ({ children } : Props){ 
    return (
        <section className="py-8 px-12 flex flex-col text-zinc-900 gap-4">
            {children}
        </section>
    );
}