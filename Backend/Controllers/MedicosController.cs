using Backend.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/")]
public class MedicosController : ControllerBase
{
         private readonly MedicosService _medicosService;

        public MedicosController(MedicosService medicosService)
        {
        _medicosService = medicosService;
        }

    [HttpGet("medicos-consultas")]
    public ActionResult GetMedicosConsutlas()
    {
        var total = _medicosService.MedicosConsultas();
        return Ok(total);
    }
    }

