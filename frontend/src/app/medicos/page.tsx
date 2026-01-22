"use client";
import { useEffect, useState } from "react";


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


// componentes
import {Header} from "@/components/Header/header";
import Cards from "@/components/Cards/cards";
import Lista from "@/components/Listas/listas";
import { ChartContainer, ChartConfig, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import {TableCell} from "@/components/ui/table"

// apis
import { BuscarGraficosMedicos, BuscarListasMedicos } from "@/api/medicos";

// types
import { Icone } from "@/components/Icone/icone";
import Grafico from "@/components/Graficos/grafico";
import { EspecialidadeConsulta, EspecialidadeExames, MedicosExames, MedicosConsultas } from "@/types/medico";





export default function Medicos(){
    // cards
    const [medConsultaLider, setMedConsultaLider] = useState<string>("");
    const [medExameLider, setMedExameLider] = useState<string>("");
    // graficos
    const [espeConsulta, setEspeConsulta] =  useState <EspecialidadeConsulta[]>([]);
    const [espeExame, setEspeExame] =  useState <EspecialidadeExames[]>([]);
     
    // listas
    const [medConsulta, setMedConsulta] = useState <MedicosConsultas[]>([]);
    const [medExame, setMedExame] = useState <MedicosExames[]>([]);

    async function MedicosCards() {
        const dataCards = await BuscarListasMedicos();

        if(dataCards){
            setMedConsultaLider(dataCards.medicosConsultas?.[0]?.medicos || "");
            setMedExameLider(dataCards.medicosExames?.[0]?.medicos || "");
            setMedConsulta(dataCards.medicosConsultas || []);
            setMedExame(dataCards.medicosExames || []);
        }
    }

    async function MedicosGraficos()  {
        const dataGraficos = await BuscarGraficosMedicos();

        if(dataGraficos){
            setEspeConsulta(dataGraficos.especialidadeConsulta || []);
            setEspeExame(dataGraficos.especialidadeExames || []);
        }
    }

    async function MedicosListas(){
        const dataListas = await BuscarListasMedicos();

        if(dataListas){
            setMedConsulta(dataListas.medicosConsultas || []);
            setMedExame( dataListas.medicosExames || []);
        }
    }

    useEffect(() => {
        MedicosCards();
        MedicosGraficos();
    }, []);
    
    //Configs
    const especialidadeConsultaConfig = {
        especialidade: {
            label : "consultas"
        }
    }
    const especialidadeExamesConfig = {
        especialidade: {
            label : "exames"
        }
    }

     // cores
     const cores = [
        "var(--chart-1)",
        "var(--chart-2)",
        "var(--chart-3)",
        "var(--chart-4)",
        "var(--chart-5)",
      ];
    return(
        <main className="sm:ml-14">
            <Header />       
            <div className="flex justify-between">
                <h1 className="m-5 font-bold text-lg lg:text-2xl">Dashboard Medicos</h1>
            </div>
            <section  className="grid grid-cols-2 w-[90%] mx-auto gap-5 
            sm:w-[80%]
            md:w-[75%]
            lg:grid-cols-2 lg:w-[70%]
            2xl:gap-20 cursor-pointer "
            >
                <Cards
                titulo="Medico Exames"
                tituloDesc="Medico Lider"
                icone={<Icone nome="Briefcase" />}
                dados={medExameLider}
                />
                <Cards
                titulo="Medico Consultas"
                tituloDesc="Medico Lider"
                icone={<Icone nome="Briefcase" />}
                dados={medConsultaLider}
                />
            </section>
            <section  className="flex flex-col justify-center items-center mb-5 lg:flex-row lg:flex-wrap">
                <div className="w-[90%]  lg:w-[44%]  lg:mr-[1%]">
                <Grafico 
                titulografico="Especialidade Consulta"
                textoInfo="As top consultas de acordo com a especialidade do medico"
                >
                <ResponsiveContainer height={250}>
                    <ChartContainer config={especialidadeConsultaConfig} className="h-full w-full">
                    <BarChart
                    accessibilityLayer
                    data={espeConsulta}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <YAxis
                      dataKey="especialidade"
                      type="category"
                      tickMargin={10}
                      width={100}
                    //   tickFormatter={(value) => {
                    //     const palavras = value.split(" ");
                    //     return palavras.slice(0, 3).join(" ");
                    //   }}
                    />
                    <XAxis type="number" dataKey="consultas" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="consultas"
                      label={{ position: "center", fill: "white" }}
                    >
                      {espeConsulta.map((entry, index) => (
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
                <div className="w-[90%]  lg:w-[45%]">
                <Grafico 
                titulografico="Especialidade Exames"
                textoInfo="As top exames de acordo com a especialidade do medico"
                >
                <ResponsiveContainer height={250}>
                    <ChartContainer config={especialidadeExamesConfig} className="h-full w-full">
                    <BarChart
                    accessibilityLayer
                    data={espeExame}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <YAxis
                      dataKey="especialidade"
                      type="category"
                      tickMargin={10}
                      width={100}
                    //   tickFormatter={(value) => {
                    //     const palavras = value.split(" ");
                    //     return palavras.slice(0, 3).join(" ");
                    //   }}
                    />
                    <XAxis type="number" dataKey="exames" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="exames"
                      label={{ position: "center", fill: "white" }}
                    >
                      {espeExame.map((entry, index) => (
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
        <div className=" w-[95%] mb-5  lg:w-[40%]">
          
            <Lista
              textoInfo="Top 10 medicos por consultas"
              titulo="Produtos Em Destaque"
              colunas={["Medico", "email","crm","consultas"]}
              dados={medConsulta}
              renderItem={(item) => (
                <>
                  <TableCell className="font-medium">{item.medicos}</TableCell>
                  <TableCell className="font-medium">{item.email}</TableCell>
                  <TableCell className="font-medium">{item.crm}</TableCell>
                  <TableCell className="font-medium">{item.consultas}</TableCell>
                </>
              )}
            />
        
        </div>
        <div className=" w-[95%] mb-5 lg:w-[40%] ">
         
            <Lista
              textoInfo="Top 10 Medicos por exames."
              titulo="Fabricantes Em Destaque"
              colunas={["Medico", "email","crm","exames"]}
              dados={medExame}
              renderItem={(item) => (
                <>
                    <TableCell className="font-medium">{item.medicos}</TableCell>
                  <TableCell className="font-medium">{item.email}</TableCell>
                  <TableCell className="font-medium">{item.crm}</TableCell>
                  <TableCell className="font-medium">{item.exames}</TableCell>
                </>
              )}
            />
        </div>
      </section>
        </main>
    )
};