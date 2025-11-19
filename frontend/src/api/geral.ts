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

export const BuscarGraficosGeral = async () => {
    try {
        const response = await api.get('/graficos-geral');
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