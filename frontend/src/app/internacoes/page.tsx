import { useState } from "react";

//API
import { BuscarCardsInternacoes, BuscarGraficosInternacoes, BuscarListasInternacoes } from "@/api/internacoes";

//TYPES
import { Internacoes, internacoesDepartamentos, InternacoesSemestral, DepartamentosResponsaveis} from "@/types/internacoes";

export default function internacoes(){

//cards
const [internacoesTotal, setInternacoesTotal] = useState<Internacoes[]>([]);
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

    if(dataCardsInternacoes && dataCardsAlta && dataCardsDepartamento){
        const totalInternacoes = dataCardsInternacoes.reduce((soma: number, item: Internacoes) => soma + item.internacoes,0)
        setInternacoesTotal(totalInternacoes || 0)
        setInternacoesAlta(dataCardsAlta || []);
        setDepartamentoLider(dataCardsDepartamento?.[0].departamento)
    }
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


}