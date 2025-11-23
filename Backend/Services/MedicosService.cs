using Backend.Conexao;
using Backend.Dto;

namespace Backend.Services
{
    public class MedicosService
    {
        public static List<MedicosConsultasDto> MedicosConsultas()
        {
            var lista = new List<MedicosConsultasDto>();
            using var conexao = ConexaoPostgres.ObterConexao();

            using var comando = conexao.CreateCommand();
            comando.CommandText = @"
            SELECT 
                m.nome as medico,
                m.email as email,
                m.crm as crm,
                count(*) as consultas
            FROM CONSULTAS c
            inner join MEDICOS m
	            on c.medico_id  = m.medico_id
            group by m.nome,m.email,m.crm
            order by consultas desc";

            using var reader = comando.ExecuteReader();

            while (reader.Read())
            {
                lista.Add(new MedicosConsultasDto
                {
                    medicos = reader["medico"] == DBNull.Value ? string.Empty : reader["medico"].ToString().Trim(),
                    email = reader["email"] == DBNull.Value ? string.Empty : reader["email"].ToString().Trim(),
                    crm = reader["crm"] == DBNull.Value ? string.Empty : reader["crm"].ToString().Trim(),
                    consultas = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                });
            };
            return lista;
        }

        public static  List<MedicoExameDto> MedicoExames()
        {
            var lista = new List<MedicoExameDto>();
            using var conexao = ConexaoPostgres.ObterConexao();

            using var comando = conexao.CreateCommand();
            comando.CommandText = @"
            SELECT 
                m.nome as medico,
                m.email as email,
                m.crm as crm,
                count(*) as exames
            FROM EXAMES e
            inner join MEDICOS m
	            on e.medico_id  = m.medico_id
            group by m.nome,m.email,m.crm
            order by exames desc
            ";
            using var reader = comando.ExecuteReader();

            while (reader.Read())
            {
                lista.Add(new MedicoExameDto
                {
                    medicos = reader["medico"] == DBNull.Value ? string.Empty : reader["medico"].ToString().Trim(),
                    email = reader["email"] == DBNull.Value ? string.Empty : reader["email"].ToString().Trim(),
                    crm = reader["crm"] == DBNull.Value ? string.Empty : reader["crm"].ToString().Trim(),
                    exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"])

                });
            };
            return lista;
        }


        public static List<EspecialidadeConsultas> EspecialidadeConsultas() 
        {
            var lista = new List<EspecialidadeConsultas>();
            using var conexao = ConexaoPostgres.ObterConexao();

            using var comando = conexao.CreateCommand();
            comando.CommandText = @"
            select 
                m.especialidade as especialidade,
                count(*)as consultas
            from medicos m
            inner join consultas c
	            on m.medico_id = c.medico_id
            group by m.especialidade
            order by consultas desc
            limit 5
            ";

            using var reader = comando.ExecuteReader();

            while (reader.Read()) 
            {
                lista.Add(new EspecialidadeConsultas
                {
                    especialidade = reader["especialidade"] == DBNull.Value ? string.Empty : reader["especialidade"].ToString().Trim(),
                    consultas = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                });
            }
            return lista;
        }

        public static List<EspecialidadeExames> EspecialidadeExames()
        {
            var lista = new List<EspecialidadeExames>();
            using var conexao = ConexaoPostgres.ObterConexao();

            using var comando = conexao.CreateCommand();
            comando.CommandText = @"
            select 
                 m.especialidade as especialidade,
                 count(*) as exames 
             from medicos m
             inner join exames e
                on m.medico_id = e.medico_id
             group by m.especialidade
             order by exames desc
             limit 5;
            ";

            using var reader = comando.ExecuteReader();

            while (reader.Read())
            {
                lista.Add(new EspecialidadeExames
                {
                    especialidade = reader["especialidade"] == DBNull.Value ? string.Empty : reader["especialidade"].ToString().Trim(),
                    exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"])
                });
            }
            return lista;
        }
    }
}
