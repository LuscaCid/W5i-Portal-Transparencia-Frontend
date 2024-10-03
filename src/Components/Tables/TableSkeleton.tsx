import { Skeleton } from "@mui/material";

export function TableSkeleton ( ) {
    return (
    <main className="flex flex-col gap-3 ">
        <Skeleton animation="wave" variant="rectangular" className="p-4 rounded-md w-1/2"/>
        <section className="flex flex-col gap-3">  
            <div  className="p-4 flex flex-col w-full gap-1 bg-zinc-300 dark:bg-zinc-700 rounded-md">
                <Skeleton animation="wave" className="p-6 rounded-t-md" variant="rectangular" /> 
                <Skeleton animation="wave" className="p-6 " variant="rectangular" /> 
                <Skeleton animation="wave" className="p-6 rounded-b-md" variant="rectangular" /> 
            </div >
        </section>      
    </main>
    );
}