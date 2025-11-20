"use client";

//types
import { ConsultasSemestral, ExamesSemestral, MedicosConsultas, MedicosExames } from "@/types/geral";
//apis
import { BuscarCardsGeral, BuscarGraficosGeral } from "@/api/geral";
// componentes
import { Header } from "@/components/Header/header";
import { useState , useEffect} from "react";

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

  async function CardsGeral(){
    try{
      const dataCards = await BuscarCardsGeral();
    if(dataCards){
      setPacientesCadastrados(dataCards[0].pacientes || 0);
      setMedicosCadastrados(dataCards[1].medicos || 0);
      setExamesCadastrados(dataCards[2].exames || 0);
      setConsultasCadastrados(dataCards[3].consultas || 0);
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
      console.log("erro na busca de algum grafico Geral!")
    }
  }
  
  useEffect (() => {
    CardsGeral();
    GraficosGeral();
  }, []); 

  return (
    <main className="sm:ml-14">
      <Header />
       <div className="flex justify-between">
        <h1 className="m-5 font-bold text-lg lg:text-2xl">Dashboard Geral</h1>
      </div>
    </main>
  )
}
