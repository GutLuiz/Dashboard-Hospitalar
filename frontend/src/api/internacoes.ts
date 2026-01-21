import { api } from "./api";

export const BuscarCardsInternacoes = async (status: string = "*") => {
    try {
        const response = await api.get('/cards-internacoes', {
            params:{status:status}
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const BuscarGraficosInternacoes = async (ano: number = 2025, mes: number = 4) => {
    try {
        const response = await api.get('/graficos-internacoes',{
            params:{ano:ano, mes:mes}
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const BuscarListasInternacoes = async () => {
    try {
        const response = await api.get('/listas-internacoes');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}