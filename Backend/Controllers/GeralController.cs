using Backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/")]
    public class GeralController : ControllerBase
    {

        [HttpGet("cards-geral")]
        public IActionResult GetCards() 
        {
            var cards = GeralService.CardsGeral();
            return Ok(cards);
        }

        [HttpGet("graficos-geral")]
        public IActionResult GetGraficos(int? ano = null, int? mes = null) 
        {
            var ExamesSemestral = GeralService.ExameSemestral(ano, mes);
            var MedicosExames = GeralService.MedicosExames();
            var ConsultasSemestral = GeralService.ConsultasSemestral(ano, mes);
            var MedicosConsulta = GeralService.MedicosConsulta();
            return Ok(new {
                ExamesSemestral,
                MedicosExames,
                ConsultasSemestral,
                MedicosConsulta,
            });
        }

        [HttpGet("listas-geral")]
        public IActionResult GetListas()
        {
            var ExamesPacientes = GeralService.PacientesExames();
            var ConsultasPacientes = GeralService.PacitentesConsultas();
            return Ok(new
            {
                ExamesPacientes,
                ConsultasPacientes
            });
        }

}

