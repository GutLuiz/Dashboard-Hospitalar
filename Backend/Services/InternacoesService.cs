

using Backend.Conexao;
using Backend.Dto;

namespace Backend.Services
{
    public class InternacoesService {
        public static List<InternacoesStatus> InternacoesStatus(string status) 
        {
            var lista = new List<InternacoesStatus>();
            var comando = ConexaoServico.ConexaoPostgres.CreateCommand();

            comando.CommandText = @"
            SELECT 
                i.status AS status,
                COUNT(*) AS internacoes
            FROM internacoes i
            WHERE (@status = '*' OR i.status = @status)
            GROUP BY i.status
            ORDER BY internacoes DESC;
            ";
            if (string.IsNullOrEmpty(status))
                status = "*";

            comando.Parameters.AddWithValue("status", status);

            var reader = comando.ExecuteReader();

            while (reader.Read()) 
            {
                lista.Add(new InternacoesStatus {
                    status = reader["status"] == DBNull.Value ? string.Empty : reader["status"].ToString().Trim(),
                    internacoes = reader["internacoes"] == DBNull.Value ? 0 : Convert.ToInt32(reader["internacoes"])
                });
            }
            return lista;
        }

        public static List<InternacoesSemestral> InternacoesSemestral(int? ano, int? mes)
        {
            var lista = new List<InternacoesSemestral>();
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
                   COUNT(*) as internacoes
                FROM internacoes i
                WHERE i.data_entrada::date BETWEEN @dataInicio and @dataFim;                       
                ";
                comando.Parameters.Clear();
                comando.Parameters.AddWithValue("@dataInicio", dataInicio);
                comando.Parameters.AddWithValue("@dataFim", dataFim);
                using var reader = comando.ExecuteReader();
                while (reader.Read())
                {
                    lista.Add(new InternacoesSemestral
                    {
                        mes = dataInicio.ToString("MMMM"),
                        internacoes = reader["internacoes"] == DBNull.Value ? 0 : Convert.ToInt32(reader["internacoes"])
                    });
                }
            }
            return lista;
        }


        public static List <InternacoesDepartamento> InternacoesDepartamentos() 
        {
           var lista = new List<InternacoesDepartamento>();
           var comando = ConexaoServico.ConexaoPostgres.CreateCommand();

            comando.CommandText = @"
            select 
                d.nome as departamentos,
                count (*) as internacoes
            from internacoes i
            inner join departamentos d
	            on i.departamento_id = d.departamento_id
            group by d.nome
            order by internacoes desc;
            ";

            var reader = comando.ExecuteReader();

            while (reader.Read())
            {
                lista.Add(new InternacoesDepartamento
                {
                    departamento = reader["departamentos"] == DBNull.Value ? string.Empty : reader["departamentos"].ToString().Trim(),
                    internacoes = reader["internacoes"] == DBNull.Value ? 0 : Convert.ToInt32(reader["internacoes"])
                });
            }
            return lista;
        }
        public static List<InternacoesResponsaveis> DepartamentosResposaveis()
        {
            var lista = new List<InternacoesResponsaveis>();
            var comando = ConexaoServico.ConexaoPostgres.CreateCommand();

            comando.CommandText = @"
            select 
                d.nome as departamento,
                r.nome as responsavel,
                r.cpf as cpf,
                r.email as email
            from departamentos d
            inner join responsavel r
	            on r.id = d.responsavel_id
            ";
            var reader = comando.ExecuteReader();

            while (reader.Read()) 
            {
                lista.Add(new InternacoesResponsaveis 
                {
                    deparmento = reader["departamento"] == DBNull.Value ? string.Empty : reader["departamento"].ToString().Trim(),
                    responsaveis = reader["responsavel"] == DBNull.Value ? string.Empty : reader["responsavel"].ToString().Trim(),
                    cpf = reader["cpf"] == DBNull.Value ? string.Empty : reader["cpf"].ToString().Trim(),
                    email = reader["email"] == DBNull.Value ? string.Empty : reader["email"].ToString().Trim(),
                });
            }
            return lista;
        }
    }
}
    

