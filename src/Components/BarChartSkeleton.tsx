import { Skeleton } from "@mui/material";

export function BarChartSkeleton(){
    return (
        <div className="flex gap-1 mt-1">
            <aside className="flex flex-col gap-12">
                {
                    [1,2,3,4].map(() => (
                        <Skeleton variant="rectangular" animation="wave" className="w-[80px] p-2 rounded-none dark:bg-zinc-800"/>
                    ))
                }
            </aside>
            <div className="flex flex-col gap-4">
                <main className="bg-zinc-300 dark:bg-zinc-800 p-4 px-6 flex w-[600px] h-[312px] items-end justify-between ">
                    {
                    [1,2,3].map(() => (
                            <aside className="flex flex-row gap-1 h-full ">
                                
                                <Skeleton variant="rectangular" animation="wave" className="self-end h-[90%] p-7"/>
                                <Skeleton variant="rectangular" animation="wave" className="self-end h-[60%] p-7"/>
                                <Skeleton variant="rectangular" animation="wave" className="self-end h-[40%] p-7"/>
                            </aside>
                        ))
                    }
                </main>
                <footer className="flex items-center gap-2 w-full  justify-center">
                    {
                        [1,2,3].map(() => (
                            <Skeleton variant="rectangular" animation="wave" className="p-1 w-[100px]"/>
                        ))
                    }
                </footer>   
            </div>
           
        </div>
        
    
    );
}