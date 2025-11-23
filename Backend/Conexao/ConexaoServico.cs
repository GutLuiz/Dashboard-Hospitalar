using Npgsql;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Backend.Conexao
{
    public static class ConexaoPostgres
    {
        private static string _connectionString;

        public static void Configurar(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public static NpgsqlConnection ObterConexao()
        {
            var conexao = new NpgsqlConnection(_connectionString);
            conexao.Open();
            return conexao;
        }
    }
}
