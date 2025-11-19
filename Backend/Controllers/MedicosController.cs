using Backend.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/")]
public class MedicosController : ControllerBase
{
    [HttpGet("graficos-medicos")]
    public ActionResult GetGraficos()
    {
        var EspecialidadeConsulta = MedicosService.EspecialidadeConsultas();
        var EspecialidadeExames = MedicosService.EspecialidadeExames();
        return Ok(new
        {
            EspecialidadeConsulta,
            EspecialidadeExames
        });
    }

    [HttpGet("listas-medicos")]
    public ActionResult GetListas()
    {
        var MedicosConsultas = MedicosService.MedicosConsultas();
        var MedicosExames = MedicosService.MedicoExames();
        return Ok(new
        {
            MedicosConsultas,
            MedicosExames
        });
    }


}

