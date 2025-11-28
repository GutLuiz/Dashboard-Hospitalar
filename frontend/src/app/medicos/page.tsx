import { use, useEffect, useState } from "react";

// types
import { EspecialidadeConsulta, EspecialidadeExames, MedicosExames } from "@/types/medico";

// componentes
import {Header} from "@/components/Header/header";

// apis
import { BuscarGraficosMedicos, BuscarListasMedicos } from "@/api/medicos";
import { MedicosConsultas } from "@/types/geral";



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
            setMedConsultaLider(dataCards.medicosConsultas[0].medicos || "");
            setMedExameLider(dataCards.medicosExames[0].medicos || "");
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
        MedicosCards(),
        MedicosGraficos(),
        MedicosListas()
    });
    

    return(
        <main>
            <Header />       
        </main>
    )
};