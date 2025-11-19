namespace Backend.Dto
{
    public class MedicosConsultasDto
    {
        public string medicos { get; set; } = "";
        public string email { get; set; } = "";
        public string crm { get; set; } = "";
        public int consultas { get; set; } = 0;
    }
    public class MedicoExameDto
    {
        public string medicos { get; set; } = "";
        public string email { get; set; } = "";
        public string crm { get; set; } = "";

        public int exames { get; set; } = 0;
    }

    public class EspecialidadeConsultas 
    {
        public string especialidade { get; set; } = "";
        public int consultas { get; set; } = 0;
    }

    public class EspecialidadeExames
    {
        public string especialidade { get; set; } = "";
        public int exames { get; set; } = 0;
    }


}

