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
    </main>
  )
}
