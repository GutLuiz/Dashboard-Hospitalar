"use client";
import { useState , useEffect} from "react";

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
//types
import { ConsultasPacientes, ConsultasSemestral, ExamesPacientes, ExamesSemestral, MedicosConsultas, MedicosExames } from "@/types/geral";
//apis
import { BuscarCardsGeral, BuscarGraficosGeral, BuscarListasGeral } from "@/api/geral";
// componentes
import { Header } from "@/components/Header/header";
import { Icone } from "@/components/Icone/icone";
import Cards from "@/components/Cards/cards";
import { ChartContainer, ChartConfig, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import {TableCell} from "@/components/ui/table"
import Grafico from "@/components/Graficos/grafico";
import Lista from "@/components/Listas/listas";


export default function Home() {
  // cards
  const[pacientesCadastrados, setPacientesCadastrados] = useState<number>(0);
  const[medicosCadastrados, setMedicosCadastrados] = useState<number>(0);
  const[examesCadastrados, setExamesCadastrados] = useState<number>(0);
  const[consultasCadastrados, setConsultasCadastrados] = useState<number>(0);
  // graficos
  const [examesSemestral, setExamesSemestral] = useState<ExamesSemestral[]>([]);
  const [medicosExames, setMedicosExames] = useState<MedicosExames[]>([]);
  const [consultasSemestral, setconsultasSemestral] = useState<ConsultasSemestral[]>([]);
  const [medicosConsultas, setMedicosConsultas] = useState<MedicosConsultas[]>([]);
  // listas
  const [pacientesExames, setPacientesExames] = useState<ExamesPacientes[]>([]);
  const [pacientesConsultas, setPacientesConsultas] = useState<ConsultasPacientes[]>([]);


  async function CardsGeral(){
    try{
      const dataCards = await BuscarCardsGeral();
    if(dataCards){
      setPacientesCadastrados(dataCards[0].pacientes || 0);
      setMedicosCadastrados(dataCards[0].medicos || 0);
      setExamesCadastrados(dataCards[0].exames || 0);
      setConsultasCadastrados(dataCards[0].consultas || 0);
    }
    }catch(error){
      console.log("erro na busca de algum card Geral!")
    }
  }

  async function GraficosGeral() {
    try{
      const dataGraficos = await BuscarGraficosGeral();
      if(dataGraficos){
        setExamesSemestral(dataGraficos.examesSemestral || []);
        setMedicosExames(dataGraficos.medicosExames || []);
        setconsultasSemestral(dataGraficos.consultasSemestral || []);
        setMedicosConsultas(dataGraficos.medicosConsulta || []);
      }
    }catch(error){
      console.log("erro na busca de algum graficos Geral!")
    }
  }

  async function ListasGeral(){
    try{
      const dataListas = await BuscarListasGeral();
      if(dataListas){
        setPacientesExames(dataListas.examesPacientes || []);
        setPacientesConsultas(dataListas.consultasPacientes || []);
      }
    }catch(error){
      console.log("erro na busca de algum listas Geral!")
    }
  }
  
  useEffect (() => {
    CardsGeral();
    GraficosGeral();
    ListasGeral()
  }, []); 

   //CONFIGS
   const examesSemestraisConfig = {
    exames: {
      label: "exames",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const examesMedicosConfig = {
    medicos: {
      label: "medicos",
    },
  } satisfies ChartConfig;

  const consultasSemestraisConfig = {
    exames: {
      label: "consultas",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;


    // cores
    const cores = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ];

  return (
    <main className="sm:ml-14">
      <Header />
       <div className="flex justify-between">
        <h1 className="m-5 font-bold text-lg lg:text-2xl">Dashboard Geral</h1>
      </div>
      <section
        className="grid grid-cols-2 w-[90%] mx-auto gap-5 
      sm:w-[80%]
      md:w-[75%]
      lg:grid-cols-4 lg:w-[90%]
      2xl:gap-20 cursor-pointer "
      >
        <Cards
          titulo="Pacientes"
          tituloDesc="Pacientes Cadastrados"
          icone={<Icone nome="ShoppingBag" />}
          dados={pacientesCadastrados}
        />
        <Cards
          titulo="Medicos"
          tituloDesc="Medicos Cadastrados"
          icone={<Icone nome="Users" />}
          dados={medicosCadastrados}
        />
        <Cards
          titulo="Exames"
          tituloDesc="Exames Cadastrados"
          icone={<Icone nome="BadgeDollarSign" />}
          dados={examesCadastrados}
        />
        <Cards
          titulo="Consultas"
          tituloDesc="Consultas Cadastradas"
          icone={<Icone nome="Crosshair" />}
          dados={consultasCadastrados}
        />
      </section>
      <section className="flex flex-col justify-center items-center mb-5 lg:flex-row lg:flex-wrap">
        <div className="w-[90%] mb-5 lg:w-[59%] lg:mr-[1%]">
           <Grafico
           titulografico="Exame Semestral"
           textoInfo="Exames feitos no semestre atual.">
           <ResponsiveContainer width="100%" height={250}>
              <ChartContainer config={examesSemestraisConfig} className="h-full w-full">
              <LineChart
                    accessibilityLayer
                    data={examesSemestral}
                    margin={{ right: 40, left: 20 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="mes"
                      tickFormatter={(value) => value.slice(0, 3)}
                      interval={0}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Line
                      dataKey="exames"
                      strokeWidth={2}
                      stroke={examesSemestraisConfig.exames.color}
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
            titulografico="Medicos Exames"
            textoInfo="Os 5 medicos com mais exames."
          >
            <ResponsiveContainer height={250}>
              <ChartContainer config={examesMedicosConfig} className="h-full w-full">

                  <BarChart
                    accessibilityLayer
                    data={medicosExames}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <YAxis
                      dataKey="medicos"
                      type="category"
                      tickMargin={10}
                      width={100}
                      tickFormatter={(value) => {
                        const palavras = value.split(" ");
                        return palavras.slice(0, 3).join(" ");
                      }}
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
                      {medicosExames.map((entry, index) => (
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
      <section className="flex flex-col justify-center items-center mb-5 lg:flex-row lg:flex-wrap">
      <div className="w-[90%] mb-5 lg:w-[30%]">
        <Grafico
            titulografico="Medicos Consultas"
            textoInfo="Os 5 medicos com mais consultas."
          >
            <ResponsiveContainer height={250}>
              <ChartContainer config={examesMedicosConfig} className="h-full w-full">

                  <BarChart
                    accessibilityLayer
                    data={medicosConsultas}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                  >
                    <YAxis
                      dataKey="medicos"
                      type="category"
                      tickMargin={10}
                      width={100}
                      tickFormatter={(value) => {
                        const palavras = value.split(" ");
                        return palavras.slice(0, 3).join(" ");
                      }}
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
                      {medicosExames.map((entry, index) => (
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
        <div className="w-[90%] mb-5 lg:w-[59%] lg:ml-[1%]">
           <Grafico
           titulografico="Consulta Semestral"
           textoInfo="Exames feitos no semestre atual.">
           <ResponsiveContainer width="100%" height={250}>
              <ChartContainer config={consultasSemestraisConfig} className="h-full w-full">
              <LineChart
                    accessibilityLayer
                    data={consultasSemestral}
                    margin={{ right: 40, left: 20 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="mes"
                      tickFormatter={(value) => value.slice(0, 3)}
                      interval={0}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Line
                      dataKey="consultas"
                      strokeWidth={2}
                      stroke={examesSemestraisConfig.exames.color}
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
      </section>
      <section className=" flex flex-col items-center justify-center lg:flex-row lg:justify-around">
        <div className=" w-[95%]  lg:w-[40%]">
          
            <Lista
              textoInfo="Top 10 produtos com maiores volumes de vendas."
              titulo="Produtos Em Destaque"
              colunas={["Nome", "cpf","Email","Telefone", "Exames"]}
              dados={pacientesExames}
              renderItem={(item) => (
                <>
                  <TableCell className="font-medium">{item.pacientes}</TableCell>
                  <TableCell className="font-medium">{item.cpf}</TableCell>
                  <TableCell className="font-medium">{item.email}</TableCell>
                  <TableCell className="font-medium">{item.telefone}</TableCell>
                  <TableCell className="font-medium ">{item.exames}</TableCell>
                </>
              )}
            />
        
        </div>
        <div className=" w-[95%]  lg:w-[40%]">
            <Lista
              textoInfo="Top 10 fabricantes com maiores volumes de vendas."
              titulo="Fabricantes Em Destaque"
              colunas={["Nome", "cpf","Email","Telefone", "Consultas"]}
              dados={pacientesConsultas}
              renderItem={(item) => (
                <>
                  <TableCell className="font-medium">{item.pacientes}</TableCell>
                  <TableCell className="font-medium">{item.cpf}</TableCell>
                  <TableCell className="font-medium">{item.email}</TableCell>
                  <TableCell className="font-medium">{item.telefone}</TableCell>
                  <TableCell className="font-medium">{item.consultas}</TableCell>
                </>
              )}
            />
        </div>
      </section>
    </main>
  )
}
