using Backend.Conexao;
using Backend.Dto;

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

        public List<GeralDto> ExameSemestral(int? ano, int? mes)
        {
            var lista = new List<GeralDto>();
            using var comando = ConexaoServico.ConexaoPostgres.CreateCommand();

            var hoje = DateTime.Now;
            int anoBase = ano ?? hoje.Year;
            int mesBase = mes ?? hoje.Month;

            for (int i = 5; i >= 0; i--)
            {
                var dataInicio = new DateTime(anoBase, mesBase, 1).AddMonths(-i);
                var dataFim = dataInicio.AddMonths(1);

                comando.CommandText = @"
                SELECT 
                   COUNT(*) as exames
                FROM exames e
                WHERE e.data_exame::date BETWEEN @dataInicio and @dataFim;                       
                ";
                comando.Parameters.Clear();
                comando.Parameters.AddWithValue("@dataInicio", dataInicio);
                comando.Parameters.AddWithValue("@dataFim", dataFim);
                using var reader = comando.ExecuteReader();
                while (reader.Read())
                {
                    lista.Add(new GeralDto
                    {
                        nome = dataInicio.ToString("MMMM"),
                        exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"])
                    });
                }
            }
            return lista;
        }

        public List<GeralDto> MedicosExames()
        {
            var lista = new List<GeralDto>();
            using var comando = ConexaoServico.ConexaoPostgres.CreateCommand();

            comando.CommandText = @"
            SELECT 
                m.nome as medico,
                COUNT(distinct e.exame_id) as exames
            FROM exames e
            inner join medicos m
	            on m.medico_id = e.medico_id
            group by m.nome
            order by exames desc
            limit 5
            ";
            using var reader = comando.ExecuteReader();
            while (reader.Read())
            {
                lista.Add(new GeralDto
                {
                    nome = reader["medico"] == DBNull.Value ? string.Empty : reader["medico"].ToString().Trim(),
                    exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"])
                }
                );
            }
            return lista;
        }

        public List<GeralDto> ConsultasSemestral(int? ano, int? mes)
        {
            var lista = new List<GeralDto>();
            var comando = ConexaoServico.ConexaoPostgres.CreateCommand();

            var hoje = DateTime.Now;
            int anoBase = ano ?? hoje.Year;
            int mesBase = mes ?? hoje.Month;

            for (int i = 5; i >= 0; i--)
            {
                var dataInicio = new DateTime(anoBase, mesBase, 1).AddMonths(-i);
                var dataFim = dataInicio.AddMonths(1);

                comando.CommandText = @"
                SELECT 
                   COUNT(*) as consultas
                FROM consultas c
                WHERE c.data_consulta::date BETWEEN @dataInicio and @dataFim;                       
                ";
                comando.Parameters.Clear();
                comando.Parameters.AddWithValue("@dataInicio", dataInicio);
                comando.Parameters.AddWithValue("@dataFim", dataFim);
                using var reader = comando.ExecuteReader();
                while (reader.Read())
                {
                    lista.Add(new GeralDto
                    {
                        nome = dataInicio.ToString("MMMM"),
                        consultas = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                    });
                }
            }
            return lista;
        }
        public List<GeralDto> MedicosConsulta()
        {
            var lista = new List<GeralDto>();
            var comando = ConexaoServico.ConexaoPostgres.CreateCommand();

            comando.CommandText = @"
            SELECT 
                m.nome as medico,
                COUNT(distinct c.consulta_id) as consultas
            FROM consultas c
            inner join medicos m
	            on m.medico_id = c.medico_id
            group by m.nome
            order by consultas desc
            limit 5
            ";
            using var reader = comando.ExecuteReader();
            while (reader.Read())
            {
                lista.Add(new GeralDto
                {
                    nome = reader["medico"] == DBNull.Value ? string.Empty : reader["medico"].ToString().Trim(),
                    consultas = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                }
                );
            }
            return lista;
        }

        public List<GeralDto> PacientesExames() 
        {
            var lista = new List<GeralDto>();
            var comando = ConexaoServico.ConexaoPostgres.CreateCommand();

            comando.CommandText = @"
            select
                p.nome as paciente,
                p.cpf as cpf,
                p.email as email,
                p.telefone telefone,
                count(*) as exames
            from exames e
            inner join pacientes p
	            on p.paciente_id = e.paciente_id
            group by p.nome, p.cpf, p.telefone, p.email
            order by exames desc
            limit 15
            ";

            var reader = comando.ExecuteReader();
            while (reader.Read())
            {

                lista.Add(new GeralDto
                {
                    nome = reader["paciente"] == DBNull.Value ? string.Empty : reader["paciente"].ToString().Trim(),
                    cpf = reader["cpf"] == DBNull.Value ? 0 : Convert.ToInt32(reader["cpf"]),
                    email = reader["email"] == DBNull.Value ? string.Empty : reader["email"].ToString().Trim(),
                    telefone = reader["telefone"] == DBNull.Value ? 0 : Convert.ToInt32(reader["telefone"]),
                    exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"])
                });
            }
            return lista;
        }
    }
}
