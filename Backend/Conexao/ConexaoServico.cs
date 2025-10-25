using Npgsql;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Backend.Conexao
{
    public static class ConexaoServico
    {
        private static string _connectionString;
        private static NpgsqlConnection _conexaoPostgres;

        public static void Configurar(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                                ?? throw new InvalidOperationException("DefaultConnection não encontrada no appsettings.json");
        }

        public static NpgsqlConnection ConexaoPostgres
        {
            get
            {
                if (_conexaoPostgres == null)
                {
                    _conexaoPostgres = new NpgsqlConnection(_connectionString);
                    _conexaoPostgres.Open();
                }
                else if (_conexaoPostgres.State != ConnectionState.Open)
                {
                    _conexaoPostgres.Open();
                }
                return _conexaoPostgres;
            }
        }
    }
}
