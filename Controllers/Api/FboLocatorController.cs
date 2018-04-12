using System.Collections.Generic;
using System.Security.Principal;
using System.Web.Http;
using EventsPromotions.Interfaces.Proxy;
using EventsPromotions.Models;
using EventsPromotions.Models.ViewModels;
using EventsPromotions.Proxy;
using EventsPromotions.Services;

namespace EventsPromotions.Web.Controllers.Api
{
    [RoutePrefix(ApiConstants.LocationLocatorApiRoute)]
    public class LocationLocatorController:ApiController
    {
        private static ILocationLocatorProxy GetBusinessLayerProxy(IPrincipal userPrincipal)
        {
            var p66Principal = WebIdentity.GetP66Principal(userPrincipal);
            return new LocationLocatorProxy(p66Principal);
        }
       
        [HttpGet]
        [Route(ApiConstants.LocationLocator.GetAllLocations)]
        public List<LocationVm> GetAllLocations()
        {
            return GetBusinessLayerProxy(User).GetAllLocations();
        }

        [HttpPost]
        [Route(ApiConstants.LocationLocator.UpdateLocationGeofence)]
        public LocationVm UpdateLocationGeofence([FromBody] LocationVm location)
        {
            return GetBusinessLayerProxy(User).UpdateLocationGeofence(location);
        }

        [HttpGet]
        [Route(ApiConstants.LocationLocator.GetGeofences)]
        public List<GimbalGeofence> GetGeofences()
        {

            return GetBusinessLayerProxy(User).GetGeofences();
            //List<GeoFence> testReturn = new List<GeoFence>();

            //for(int i = 1; i < 6; i++)
            //{
            //    var geoFence = new GeoFence()
            //    {
            //        GeoFenceId = i,
            //        GeoFenceName = $"test + {i}"
            //    };
            //    testReturn.Add(geoFence);
            //}

            //return testReturn;
        }
    }
}