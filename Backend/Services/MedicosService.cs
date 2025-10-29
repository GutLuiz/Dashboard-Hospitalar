using Backend.Conexao;
using Backend.Dto;

namespace Backend.Services
{
    public class MedicosService
    {
        public List<GeralDto> MedicosConsultas()
        {
            var lista = new List<GeralDto>();
            var comando = ConexaoServico.ConexaoPostgres.CreateCommand();

            comando.CommandText = @"
            SELECT 
                m.nome,
                m.email,
                m.crm,
                count(*) as consultas
            FROM CONSULTAS c
            inner join MEDICOS m
	            on c.medico_id  = m.medico_id
            group by m.nome,m.email,m.crm
            order by consultas desc";

            using var reader = comando.ExecuteReader();

            while (reader.Read())
            {
                lista.Add(new GeralDto
                {
                    nome = reader["paciente"] == DBNull.Value ? string.Empty : reader["paciente"].ToString().Trim(),
                    email = reader["email"] == DBNull.Value ? string.Empty : reader["email"].ToString().Trim(),
                    crm = reader["crm"] == DBNull.Value ? string.Empty : reader["crm"].ToString().Trim(),
                    consultas = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                });
            };
            return lista;
        }
    }
}
