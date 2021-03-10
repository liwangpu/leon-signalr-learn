using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatRoomController : ControllerBase
    {
        private IHubContext<ChatHub> hub;
        public ChatRoomController(IHubContext<ChatHub> hub)
        {
            this.hub = hub;
        }

        public async Task<IActionResult> Get()
        {
            //var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData()));
            await hub.Clients.All.SendAsync("ReceiveMessage", "Hello");
            return Ok(new { Message = "Request Completed" });
        }
    }
}
