
"use client"
import { useState, useEffect } from "react";


// GRAFICOS
import {
    CartesianGrid,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Label,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
    Bar,
    BarChart,
    Legend,
    Cell,
    LabelList,
    
  } from "recharts";

//API
import { BuscarCardsInternacoes, BuscarGraficosInternacoes, BuscarListasInternacoes } from "@/api/internacoes";

//TYPES
import { Internacoes, internacoesDepartamentos, InternacoesSemestral, DepartamentosResponsaveis} from "@/types/internacoes";

//COMPONENTES
import { ChartContainer, ChartConfig, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { Header } from "@/components/Header/header";
import Cards from "@/components/Cards/cards";
import { Icone } from "@/components/Icone/icone";
import Grafico from "@/components/Graficos/grafico";
import {TableCell} from "@/components/ui/table"
import Lista from "@/components/Listas/listas";


export default function internacoes(){

//cards
const [internacoesTotal, setInternacoesTotal] = useState(0);
const [internacoesAlta, setInternacoesAlta] = useState (0);
const [departamentoLider,setDepartamentoLider] = useState ("");

//graficos
const [internacoesSemestral, setInternacoesSemestral] = useState <InternacoesSemestral[]>([]);
const [internacoesDepartamentos, setInternacoesDepartamentos] = useState <internacoesDepartamentos[]>([]);

// lista
const [deparmentosLista, setDepartamentosLista] = useState <DepartamentosResponsaveis[]>([]);


async function InternacoesCards(){
    const dataCardsInternacoes = await BuscarCardsInternacoes();
    const dataCardsAlta = await BuscarCardsInternacoes("Alta");
    const dataCardsDepartamento = await BuscarListasInternacoes();

    const totalInternacoes = Array.isArray(dataCardsInternacoes)
        ? dataCardsInternacoes.reduce((soma: number, item: Internacoes) => soma + (item?.internacoes ?? 0), 0)
        : typeof dataCardsInternacoes === "object" && dataCardsInternacoes
            ? (dataCardsInternacoes as Internacoes).internacoes ?? 0
            : 0;

    const totalAltas = Array.isArray(dataCardsAlta)
        ? dataCardsAlta.reduce((soma: number, item: Internacoes) => soma + (item?.internacoes ?? 0), 0)
        : typeof dataCardsAlta === "object" && dataCardsAlta
            ? (dataCardsAlta as Internacoes).internacoes ?? 0
            : 0;

    setInternacoesTotal(totalInternacoes);
    setInternacoesAlta(totalAltas);
    setDepartamentoLider(Array.isArray(dataCardsDepartamento) && dataCardsDepartamento.length > 0 ? dataCardsDepartamento[0].departamento ?? "" : "");
}

async function InternacoesGrafico(){
    const dataGraficosInternacoes = await BuscarGraficosInternacoes();
    
    if(dataGraficosInternacoes){
        setInternacoesSemestral(dataGraficosInternacoes.internacoesSemestral || []);
        setInternacoesDepartamentos(dataGraficosInternacoes.internacoesDepartamentos || []);
    }
}

async function InternacoesListas(){
    const dataListasInternacoes = await BuscarListasInternacoes()

    if(dataListasInternacoes){
        setDepartamentosLista(dataListasInternacoes || []);
    }
}


useEffect(() => {
    InternacoesCards(),
    InternacoesGrafico(),
    InternacoesListas()
}, []);

 // cores
 const cores = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

   //CONFIGS
   const internacoesSemestralConfig = {
    internacoes: {
      label: "internacoes",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const departamentoConfig = {
    departamento: {
      label: "departamento",
    },
  } satisfies ChartConfig;

return(
    <main className="sm:ml-14">
        <Header />
        <div className="flex justify-between">
            <h1 className="m-5 font-bold text-lg lg:text-2xl">Dashboard Internacoes</h1>
        </div>
        <section  className="grid grid-cols-2 w-[90%] mx-auto gap-5 
            sm:w-[80%]
            md:w-[75%]
            lg:grid-cols-3 lg:w-[70%]
            2xl:gap-20 cursor-pointer "
            >
                <Cards
                titulo="Internacoes"
                tituloDesc="Internacoes total"
                icone={<Icone nome="Bed" />}
                dados={internacoesTotal}
                />
                <Cards
                titulo="Altas"
                tituloDesc="Altas Total"
                icone={<Icone nome="House" />}
                dados={internacoesAlta}
                />
                  <Cards
                titulo="Departamento"
                tituloDesc="Departamento Lider"
                icone={<Icone nome="Building" />}
                dados={departamentoLider}
                />
            </section>
            <section className="flex flex-col justify-center items-center mb-5 lg:flex-row lg:flex-wrap">
        <div className="w-[90%] mb-5 lg:w-[59%] lg:mr-[1%]">
           <Grafico
           titulografico="Internacoes Semestral"
           textoInfo="Internacoes feitas no semestre atual.">
           <ResponsiveContainer width="100%" height={250}>
              <ChartContainer config={internacoesSemestralConfig} className="h-full w-full">
              <LineChart
                    accessibilityLayer
                    data={internacoesSemestral}
                    margin={{ right: 40, left: 20, top:10}}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="mes"
                      tickFormatter={(value) => value.slice(0, 3)}
                      interval={0}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Line
                      dataKey="internacoes"
                      strokeWidth={2}
                      stroke={internacoesSemestralConfig.internacoes.color}
                    >
                      <LabelList
                        position="bottom"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                        formatter={(v: number) => (v < 100 ? "" : v)}
                      />
                    </Line>
                  </LineChart>
              </ChartContainer>
            </ResponsiveContainer>
           </Grafico>
        </div>
        <div className="w-[90%] mb-5 lg:w-[30%]">
        <Grafico
            titulografico="Departamentos Internacoes"
            textoInfo="Quantidade de internacoes de acordo com o departamento"
          >
            <ResponsiveContainer height={250}>
              <ChartContainer config={departamentoConfig} className="h-full w-full">

                  <BarChart
                    accessibilityLayer
                    data={internacoesDepartamentos}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <YAxis
                      dataKey="departamento"
                      type="category"
                      tickMargin={10}
                      width={100}
                    //   tickFormatter={(value) => {
                    //     const palavras = value.split(" ");
                    //     return palavras.slice(0, 3).join(" ");
                    //   }}
                    />
                    <XAxis type="number" dataKey="internacoes" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="internacoes"
                      label={{ position: "center", fill: "white" }}
                    >
                      {internacoesDepartamentos.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={cores[index % cores.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>
      </section>
      <section className=" flex flex-col items-center justify-center lg:flex-row lg:justify-around">
        <div className=" w-[90%]">
            <Lista
              textoInfo="Top 10 fabricantes com maiores volumes de vendas."
              titulo="Fabricantes Em Destaque"
              colunas={["Departamento", "responsavel","cpf","email"]}
              dados={deparmentosLista}
              renderItem={(item) => (
                <>
                  <TableCell className="font-medium">{item.departamento}</TableCell>
                  <TableCell className="font-medium">{item.responsaveis}</TableCell>
                  <TableCell className="font-medium">{item.cpf}</TableCell>
                  <TableCell className="font-medium">{item.email}</TableCell>
                </>
              )}
            />
        </div>
      </section>
        
    </main>
)

}