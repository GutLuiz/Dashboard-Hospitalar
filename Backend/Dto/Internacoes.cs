namespace Backend.Dto
{
    public class InternacoesDepartamento
    {
        public string departamento { get; set; } = "";
        public int internacoes { get; set; } = 0;
    }

    public class InternacoesStatus 
    {
        public string status { get; set; } = "";
        public int internacoes { get; set; } = 0;
    }

    public class InternacoesSemestral 
    {
        public string mes { get; set; } = "";
        public int internacoes { get; set;} = 0;
    }
    public class InternacoesResponsaveis 
    {
        public string deparmento { get; set; } = "";

        public string responsaveis { get; set; } = "";

        public string cpf { get; set; } = "";

        public string email { get; set; } = "";
    }
}
