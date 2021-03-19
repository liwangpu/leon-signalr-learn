using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IDS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrantController : ControllerBase
    {
        public GrantController()
        {

        }

        /// <summary>
        ///  根据UUID下线Grant
        /// </summary>
        /// <param name="uuid"></param>
        /// <returns></returns>
        [HttpGet("Logout/{uuid}")]
        [ProducesResponseType(204)]
        public async Task<IActionResult> Logout(string uuid)
        {
            //var uuid = context.Properties.ContainsKey("UUID") ? context.Properties["UUID"].ToString() : string.Empty;
            return Ok(new { mes = "" });
        }
    }
}
