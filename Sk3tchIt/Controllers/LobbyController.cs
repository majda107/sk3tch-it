using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Sk3tchIt.Controllers
{
    public class LobbyController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return new JsonResult("");
        }
    }
}