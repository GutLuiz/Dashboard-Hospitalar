import { api } from "./api";

export const BuscarCardsGeral = async () => {
    try {
        const response = await api.get('/cards-geral');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const BuscarGraficosGeral = async (ano: number = 2025, mes : number = 11) => {
    try {
        const response = await api.get('/graficos-geral',{params:{ano:ano, mes:mes}});
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const BuscarListasGeral = async () => {
    try {
        const response = await api.get('/listas-geral');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}