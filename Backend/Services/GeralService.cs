using Backend.Conexao;
using Backend.Dto;
using System.Collections.Generic;

namespace Backend.Services
{
    public class GeralService
    {
        public List<GeralDto> CardsGeral()
        {
            var lista = new List<GeralDto>();

            using var comando = ConexaoServico.ConexaoPostgres.CreateCommand();
            comando.CommandText = @"
                SELECT 
                    (SELECT COUNT(*) FROM PACIENTES) AS pacientes,
                    (SELECT COUNT(*) FROM MEDICOS) AS medicos,
                    (SELECT COUNT(*) FROM EXAMES) AS exames,
                    (SELECT COUNT(*) FROM CONSULTAS) AS consultas;
            ";

            using var reader = comando.ExecuteReader();
            while (reader.Read())
            {
                lista.Add(new GeralDto
                {
                    pacientes = reader["pacientes"] == DBNull.Value ? 0 : Convert.ToInt32(reader["pacientes"]),
                    medicos = reader["medicos"] == DBNull.Value ? 0 : Convert.ToInt32(reader["medicos"]),
                    exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"]),
                    consultas = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                });
            }

            return lista;
        }
    }
}
