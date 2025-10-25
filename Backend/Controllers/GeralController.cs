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
    }

