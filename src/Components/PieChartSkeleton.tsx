import { Skeleton } from "@mui/material";

export function PieChartSkeleton (){
    return (
        <main className="flex items-center justify-center h-[320px]  w-[320px]">
            <Skeleton variant="circular" className="h-full w-full dark:bg-zinc-800" animation="wave"/>
        </main>
    );
}