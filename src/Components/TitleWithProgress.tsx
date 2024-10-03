import { Typography } from "@mui/material";

export function TitleWithProgress (props : { title : string }) {
    return (
        <section className="group ">
            <Typography variant="h6" className="dark:text-zinc-100 select-none text-zinc-800" >
                {props.title }
            </Typography>
            <div className="w-0 h-[1px] bg-zinc-300  dark:bg-zinc-50  group-hover:w-[250px] transition-all duration-200"/>
        </section>
    );
}