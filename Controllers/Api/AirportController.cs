using System.Collections.Generic;
using System.Security.Principal;
using EventsPromotions.Models.ViewModels;
using System.Web.Http;
using EventsPromotions.Interfaces.Proxy;
using EventsPromotions.Models;
using EventsPromotions.Proxy;
using EventsPromotions.Services;

namespace EventsPromotions.Web.Controllers.Api
{
    [RoutePrefix(ApiConstants.AirportApiRoute)]
    public class AirportController:ApiController
    {
        private static IAirportProxy GetBusinessLayerProxy(IPrincipal userPrincipal)
        {
            var p66Principal = WebIdentity.GetP66Principal(userPrincipal);
            return new AirportProxy(p66Principal);
        }

        [HttpGet]
        [Route(ApiConstants.Airport.GetAirports)]
        public IEnumerable<AirportVm> GetAirports()
        {
            return GetBusinessLayerProxy(User).GetAirports();
        }
    }
}