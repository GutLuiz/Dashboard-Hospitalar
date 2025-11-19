namespace Backend.Dto
{
    public class GeralDto
    {
        public int medicos { get; set; } = 0;
        public int exames { get; set; } = 0;
        public int consultas { get; set; } = 0;
        public int pacientes { get; set; } = 0;
        public string nome { get; set; } = "";
        public string cpf { get; set; } = "";
        public string email { get; set; } = "";
        public string telefone { get; set; } = "";
        public string crm { get; set; } = "";

    }


    public class CardsDto
    {
        public int pacientes { get; set; } = 0;
        public int medicos { get; set; } = 0;
        public int exames { get; set; } = 0;
        public int consultas { get; set; } = 0;
    }

    public class ExamesDto
    {
        public string mes { get; set; } = "";
        public int exames { get; set; } = 0;
    }

    public class ExamesMedicosDto
    {
        public string medicos { get; set; } = "";
        public int exames { get; set; } = 0;
    }
    public class ConsutasDto
    {
        public string mes { get; set; } = "";
        public int consultas { get; set; } = 0;
    }

    public class ConsultasMedicosDto 
    {
        public string medicos { get; set; } = "";
        public int consultas { get; set; } = 0;
    }
public class PacienteExameDto 
    {
    public string pacientes { get; set; } = "";
    public string cpf { get; set; } = "";
    public string email { get; set; } = "";
    public string telefone { get; set; } = "";

    public int exames { get; set; } = 0;
}

    public class PacienteConsultaDto
    {
        public string pacientes { get; set; } = "";
        public string cpf { get; set; } = "";
        public string email { get; set; } = "";
        public string telefone { get; set; } = "";

        public int consulta { get; set; } = 0;
    }

}
