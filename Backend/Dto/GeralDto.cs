namespace Backend.Dto
{
    public class GeralDto
    {
        public int medicos { get; set; } = 0;
        public int exames { get; set; } = 0;
        public int consultas { get; set; } = 0;
        public int pacientes {  get; set; } = 0;

        public string nome { get; set; } = "";

        public int cpf { get; set; } = 0;
        public string email { get; set; } = "";
        public int telefone { get; set; }

    }
}
