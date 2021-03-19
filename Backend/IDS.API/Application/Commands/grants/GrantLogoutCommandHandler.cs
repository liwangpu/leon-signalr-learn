using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace IDS.API.Application.Commands.grants
{
    public class GrantLogoutCommandHandler : IRequestHandler<GrantLogoutCommand, string>
    {
        public GrantLogoutCommandHandler()
        {

        }

        public Task<string> Handle(GrantLogoutCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
