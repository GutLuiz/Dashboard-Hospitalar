using Backend.Conexao;
using Backend.Dto;

namespace Backend.Services
{
    public class GeralService
    {
        public static List<CardsDto> CardsGeral()
        {
            var lista = new List<CardsDto>();
            using var conexao = ConexaoPostgres.ObterConexao();

            using var comando = conexao.CreateCommand();
            comando.CommandText = @"
                SELECT 
                    (SELECT COUNT(*) FROM PACIENTES) AS pacientes,
                    (SELECT COUNT(*) FROM MEDICOS) AS medicos,
                    (SELECT COUNT(*) FROM EXAMES) AS exames,
                    (SELECT COUNT(*) FROM CONSULTAS) AS consultas;
            ";

            var reader = comando.ExecuteReader();
            while (reader.Read())
            {
                lista.Add(new CardsDto
                {
                    pacientes = reader["pacientes"] == DBNull.Value ? 0 : Convert.ToInt32(reader["pacientes"]),
                    medicos = reader["medicos"] == DBNull.Value ? 0 : Convert.ToInt32(reader["medicos"]),
                    exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"]),
                    consultas = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                });
            }
            return lista;
        }

        public static List<ExamesDto> ExameSemestral(int? ano, int? mes)
        {
            var lista = new List<ExamesDto>();
            using var conexao = ConexaoPostgres.ObterConexao();
            using var comando = conexao.CreateCommand();

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
                    lista.Add(new ExamesDto
                    {
                        mes = dataInicio.ToString("MMMM"),
                        exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"])
                    });
                }
            }
            return lista;
        }

        public static List<ExamesMedicosDto> MedicosExames()
        {
            var lista = new List<ExamesMedicosDto>();
            using var conexao = ConexaoPostgres.ObterConexao();

            using var comando = conexao.CreateCommand();
            comando.CommandText = @"
            SELECT 
                m.nome as medico,
                COUNT(distinct e.exame_id) as exames
            FROM exames e
            inner join medicos m
	            on m.medico_id = e.medico_id
            group by m.nome
            order by exames desc
            limit 5;
            ";
            using var reader = comando.ExecuteReader();
            while (reader.Read())
            {
                lista.Add(new ExamesMedicosDto
                {
                    medicos = reader["medico"] == DBNull.Value ? string.Empty : reader["medico"].ToString().Trim(),
                    exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"])
                }
                );
            }
            return lista;
        }

        public static List<ConsutasDto> ConsultasSemestral(int? ano, int? mes)
        {
            var lista = new List<ConsutasDto>();
            using var conexao = ConexaoPostgres.ObterConexao();

            var hoje = DateTime.Now;
            int anoBase = ano ?? hoje.Year;
            int mesBase = mes ?? hoje.Month;

            for (int i = 5; i >= 0; i--)
            {
                var dataInicio = new DateTime(anoBase, mesBase, 1).AddMonths(-i);
                var dataFim = dataInicio.AddMonths(1);

                using var comando = conexao.CreateCommand();
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
                    lista.Add(new ConsutasDto
                    {
                        mes = dataInicio.ToString("MMMM"),
                        consultas = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                    });
                }
            }
            return lista;
        }
        public static List<ConsultasMedicosDto> MedicosConsulta()
        {
            var lista = new List<ConsultasMedicosDto>();
            using var conexao = ConexaoPostgres.ObterConexao();

            using var comando = conexao.CreateCommand();
            comando.CommandText = @"
            SELECT 
                m.nome as medico,
                COUNT(distinct c.consulta_id) as consultas
            FROM consultas c
            inner join medicos m
	            on m.medico_id = c.medico_id
            group by m.nome
            order by consultas desc
            limit 5;
            ";
            using var reader = comando.ExecuteReader();
            while (reader.Read())
            {
                lista.Add(new ConsultasMedicosDto
                {
                    medicos = reader["medico"] == DBNull.Value ? string.Empty : reader["medico"].ToString().Trim(),
                    consultas = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                }
                );
            }
            return lista;
        }

        public static List<PacienteExameDto> PacientesExames() 
        {
            var lista = new List<PacienteExameDto>();
            using var conexao = ConexaoPostgres.ObterConexao();

            using var comando = conexao.CreateCommand();
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
            limit 5;
            ";

            using var reader = comando.ExecuteReader();
            while (reader.Read())
            {

                lista.Add(new PacienteExameDto
                {
                    pacientes = reader["paciente"] == DBNull.Value ? string.Empty : reader["paciente"].ToString().Trim(),
                    cpf = reader["cpf"] == DBNull.Value ? string.Empty : reader["cpf"].ToString().Trim(),
                    email = reader["email"] == DBNull.Value ? string.Empty : reader["email"].ToString().Trim(),
                    telefone = reader["telefone"] == DBNull.Value ? string.Empty : reader["telefone"].ToString().Trim(),
                    exames = reader["exames"] == DBNull.Value ? 0 : Convert.ToInt32(reader["exames"])
                });
            }
            return lista;
        }


        public static List<PacienteConsultaDto> PacitentesConsultas() 
        {
            var lista = new List<PacienteConsultaDto>();
            using var conexao = ConexaoPostgres.ObterConexao();

            using var comando = conexao.CreateCommand();
            comando.CommandText = @"
             select
                 p.nome as paciente,
                 p.cpf as cpf,
                 p.email as email,
                 p.telefone telefone,
                 count(*) as consultas
            from consultas c
            inner join pacientes p
                on p.paciente_id = c.paciente_id
            group by p.nome, p.cpf, p.telefone, p.email
            order by consultas desc
            limit 5;
            ";
            using var reader = comando.ExecuteReader();
            while (reader.Read())
            {
                lista.Add(new PacienteConsultaDto
                {
                    pacientes = reader["paciente"] == DBNull.Value ? string.Empty : reader["paciente"].ToString().Trim(),
                    cpf = reader["cpf"] == DBNull.Value ? string.Empty : reader["cpf"].ToString().Trim(),
                    email = reader["email"] == DBNull.Value ? string.Empty : reader["email"].ToString().Trim(),
                    telefone = reader["telefone"] == DBNull.Value ? string.Empty : reader["telefone"].ToString().Trim(),
                    consulta = reader["consultas"] == DBNull.Value ? 0 : Convert.ToInt32(reader["consultas"])
                });
            }
            return lista;
        }  
    }
}
