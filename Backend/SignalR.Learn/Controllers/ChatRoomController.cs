﻿using Base.Domain.Common;
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
        private readonly IProfileContext profileContext;

        public ChatRoomController(IHubContext<ChatHub> hub, IProfileContext profileContext)
        {
            this.hub = hub;
            this.profileContext = profileContext;
        }


        public async Task<IActionResult> Get()
        {
            var aa = HttpContext.Request.Headers;
            var u = HttpContext.User;
            var sss = this.profileContext;
            //var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferchartdata", DataManager.GetData()));
            //hub.Clients.All
            await hub.Clients.All.SendAsync("ReceiveMessage", "Hello");
            return Ok(new { Message = "Request Completed" });
        }
    }
}
