import { api } from "./api";

export const BuscarCardsInternacoes = async () => {
    try {
        const response = await api.get('/cards-internacoes');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const BuscarGraficosInternacoes = async () => {
    try {
        const response = await api.get('/graficos-internacoes');
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