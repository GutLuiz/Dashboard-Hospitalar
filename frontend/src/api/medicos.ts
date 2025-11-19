import { api } from "./api";

export const BuscarGraficosMedicos = async () => {
    try {
        const response = await api.get('/graficos-medicos');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const BuscarListasMedicos = async () => {
    try {
        const response = await api.get('/listas-medicos');
        return response.data;
    } catch (error) {
        console.error(error); 
        return null;
    }
}
