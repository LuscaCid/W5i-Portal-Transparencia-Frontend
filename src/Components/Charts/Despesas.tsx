import { Bar, BarChart, CartesianGrid, Legend, Pie, Tooltip, XAxis, YAxis, PieChart} from "recharts";
import { IconButton, Tooltip as MuiTableTooltip } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { BarChartSkeleton } from "../BarChartSkeleton";
import { DatePickerWithRange } from "../RangeCalendar";
import { PieChartSkeleton } from "../PieChartSkeleton";
import { DateRange } from "react-day-picker";
import { delay } from "../../Utils/delay";
import { api } from "../../Services/api";
import { Search } from "lucide-react";
import { addDays } from "date-fns";
interface ResultsProps {
  empenhado : number; 
  liquidado : number; 
  pago : number;
  anulado : number; 
  reforco : number;
}
export interface FormTypeSchema {
  InitialDate? : string;
  EndDate? : string;
};
export type keyofForm = keyof FormTypeSchema;
type SegmentSearch = "empenho"| "liquidacao" | "pagamento";
export function DespesasCharts (){
  const queryClient = useQueryClient();
  const [despesas, setDespesas] = useState<ResultsProps>({
    anulado : 0,
    empenhado : 0,
    liquidado : 0,
    pago : 0,
    reforco : 0,
  });
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2024, 12, 20), 20),
  })
  const { 
    data : chartsData, 
    isFetching, 
    isSuccess 
  } = useQuery({
    queryKey : ["queryClient"],
    //query para retorno somado para preenchimento de informacoes dentro do grafico.
    queryFn: async () =>{
      await delay();
      
      const urlSearchParams = new URLSearchParams();

      urlSearchParams.append("DataInicial", new Date(date!.from!).getFullYear().toString() );
      urlSearchParams.append("DataFinal", new Date(date!.to!).getFullYear().toString() );
      
      const response = await api.get<ResultsProps[]>(`charts/despesasBarCharts`, { params : urlSearchParams});
      console.log(response.data);
      return response.data;
    }
  });
  const calculatePercentage = useCallback((segment : SegmentSearch) => {
    const total = despesas.empenhado + despesas.pago + despesas.liquidado;

    const dictionary : Record<SegmentSearch, number> ={
      "empenho" :  Number(((despesas.empenhado / total ) * 100).toFixed(2)),
      "liquidacao" :  Number(((despesas.liquidado / total ) * 100).toFixed(2)),
      "pagamento" : Number(((despesas.pago / total ) * 100).toFixed(2)),
    } 
    return dictionary[segment];
  }, [despesas])

  const handleSubmitForm = useCallback(() => {
    console.log(new Date(date!.from!).getFullYear() );
    if (!date!.from || !date!.to){
      return;
    }
    queryClient.refetchQueries({queryKey : ["queryClient"]});
  }, [ queryClient, date ]);
  useEffect(() => {
    if (chartsData){
      setDespesas(prevState => ({
        ...prevState,
        empenhado :  chartsData.reduce((total, object) => object.empenhado + total, 0),
        liquidado : chartsData.reduce((total, object) => object.liquidado + total, 0),
        pago :  chartsData.reduce((total, object) => object.pago + total, 0)
      }));
    }
  } ,[chartsData])
  return (
    <main className="flex flex-col gap-3">
      <header className="flex items-center gap-4">
        <form action="" className="flex items-center gap-2" onSubmit={(e) => {
          e.preventDefault();
          handleSubmitForm();
        }}>
          <DatePickerWithRange date={date}  setDateRange={setDate}  />
          <MuiTableTooltip title="Filtrar os resultados ">
            <IconButton type="submit" color="info">
              <Search />
            </IconButton>
          </MuiTableTooltip>
        </form>
        
      </header>
      <footer className="flex lg:flex-row sm:flex-col ">
        {
          isFetching && (
            <div className="flex  gap-20">
              <BarChartSkeleton />
              <PieChartSkeleton />
            </div>
          )
        }
        {
          !isFetching && isSuccess && (
            <BarChart barCategoryGap={20} width={600} height={350}  data={chartsData}>
              <CartesianGrid strokeDasharray="3 5" />
              <XAxis dataKey="value"  />
              <YAxis dataKey="empenhado"  />
              <Tooltip  formatter={(value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }  />
              <Legend  />
              <Bar dataKey="empenhado"  fill="#8884d8" />
              <Bar dataKey="liquidado" fill="#82ca9d" />
              <Bar dataKey="pago" fill="#323232" />
            </BarChart>
          )
        }
      
        {
          !isFetching && isSuccess && (
            <PieChart className="select-none focus:outline-none" width={525} height={300} barSize={3000}>
              <Tooltip />
              <Pie 
                label
                data={[
                { //nao aceita string...
                  value : calculatePercentage("empenho")/**toLocaleString("pt-BR", { style : "currency", currency : "BRL" }) */, 
                  name : "Porcento Empenhado",
                  fill : "#2e7d32"
                },
                { //nao aceita string...
                  value : calculatePercentage("liquidacao")/**toLocaleString("pt-BR", { style : "currency", currency : "BRL" }) */, 
                  name : "Porcento Liquidado",
                  fill : "#0288d1"
                },
                { //nao aceita string...
                  value : calculatePercentage("pagamento")/**toLocaleString("pt-BR", { style : "currency", currency : "BRL" }) */, 
                  name : "Porcento Pago",
                  fill : "#82ca9d"
                }
              ]} dataKey="value" nameKey="name" cx="50%" cy="50%" width={300} height={300} outerRadius={140}  fill="#8884d8" />
            </PieChart>
          )
        }
      </footer>
      
    
    </main>
  );
}
