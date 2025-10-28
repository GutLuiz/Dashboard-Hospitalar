using Backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/")]
    public class GeralController : ControllerBase
    {
        private readonly GeralService _geralService;
        
        public GeralController(GeralService geral) 
        {
            _geralService = geral;
        }

        [HttpGet("cards-geral")]
        public IActionResult GetCards() 
        {
        var geralService = new GeralService();
        var cards = _geralService.CardsGeral();
        return Ok(cards);
        }

        [HttpGet("exames-semestral")]
        public IActionResult GetExames(int? ano = null, int? mes = null) 
        {
         var total = _geralService.ExameSemestral(ano, mes);
         return Ok(total);
        }

        [HttpGet("medicos-exames")]
        public IActionResult GetMedicosExames()
        {
            var geralService = new GeralService();
            var cards = _geralService.MedicosExames();
            return Ok(cards);
        }

        [HttpGet("consultas-semestral")]
        public IActionResult GetConsultas(int? ano = null, int? mes = null)
        {
            var total = _geralService.ConsultasSemestral(ano, mes);
            return Ok(total);
        }
        [HttpGet("medicos-consultas")]
        public IActionResult GetMedicosConsultas()
        {
            var geralService = new GeralService();
            var cards = _geralService.MedicosConsulta();
            return Ok(cards);
        }

        [HttpGet("pacientes-exames")]
        public IActionResult GetPacientesExames()
        {
            var geralService = new GeralService();
            var cards = _geralService.PacientesExames();
            return Ok(cards);
        }
        [HttpGet("pacientes-consultas")]
        public IActionResult GetPacientesConsultas()
        {
            var geralService = new GeralService();
            var cards = _geralService.PacitentesConsultas();
            return Ok(cards);
        }
}

