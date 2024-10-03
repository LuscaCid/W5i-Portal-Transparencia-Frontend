import { ContentWrapper } from "../Components/ContentWrapper";
import {EmpenhoTable} from "../Components/Tables/Empenho/EmpenhoTable";
import { TableEmpenhoFixedFilter } from "../Components/EmpenhoTableFilterFixed";
import { TitleWithProgress } from "../Components/TitleWithProgress";
import { DespesasCharts } from "../Components/Charts/Despesas";

export function Despesas () {
 
    return (
        <ContentWrapper>
            <TableEmpenhoFixedFilter />
                <span className="dark:text-zinc-50">
                    &gt; Despesas
                </span>
                <header className="flex gap-3 sm:flex-col w-full ">
                    <DespesasCharts />
                </header>
                <TitleWithProgress title="Relação de Empenhos"/>
            <EmpenhoTable />
        </ContentWrapper>
    );
}