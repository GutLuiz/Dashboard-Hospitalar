using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/")]
    public class InternacoesController : ControllerBase
    {
        [HttpGet("cards-internacoes")]
        public IActionResult GetCards([FromQuery] string? status = "*")
        {
            var InternacoesStatus = InternacoesService.InternacoesStatus(status);
            return Ok(InternacoesStatus);
        }
        [HttpGet("graficos-internacoes")]
        public IActionResult GetGraficos(int? ano = null, int? mes = null )
        {
            var InternacoesSemestral = InternacoesService.InternacoesSemestral(ano,mes);
            var InternacoesDepartamentos = InternacoesService.InternacoesDepartamentos();
            return Ok(new
            {
                InternacoesSemestral,
                InternacoesDepartamentos
            });
        }
        [HttpGet("listas-internacoes")]
        public IActionResult GetListas()
        {
            var ResponsaveisDepartamentos = InternacoesService.DepartamentosResposaveis();
            return Ok(ResponsaveisDepartamentos);
        }
    }
}
