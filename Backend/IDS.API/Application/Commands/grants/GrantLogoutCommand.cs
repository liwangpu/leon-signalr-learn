using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IDS.API.Application.Commands.grants
{
    public class GrantLogoutCommand : IRequest<string>
    {
        public string UUID { get; set; }
    }
}
