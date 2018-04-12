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
    [RoutePrefix(ApiConstants.EventCategoryRoute)]
    public class EventCategoryController : ApiController
    {
        private static IEventCategoryProxy GetBusinessLayerProxy(IPrincipal userPrincipal)
        {
           var p66Principal = WebIdentity.GetP66Principal(userPrincipal);
            return new EventCategoryProxy(p66Principal);
        }

        [Route(ApiConstants.EventCategory.GetEventCategories)]
        public IEnumerable<EventCategoryVm> GetEventCategories()
        {
             var data = GetBusinessLayerProxy(User).GetEventCategories();
           
            return data;
        }

      
        [HttpPost]
        [Route(ApiConstants.EventCategory.AddEventCategory)]
        public EventCategoryVm AddEventCategory([FromBody]EventCategoryVm model)
        {
           var data = GetBusinessLayerProxy(User).AddEventCategory(model);
            return data;
        }

        [HttpPost]
        [Route(ApiConstants.EventCategory.UpdateEventCategory)]
        public EventCategoryVm UpdateEventCategory([FromBody]EventCategoryVm model)
        {
            var data = GetBusinessLayerProxy(User).UpdateEventCategory(model);
            return data;
          
        }

        [HttpDelete]
        [Route(ApiConstants.EventCategory.DeleteEventCategory + "/{id}")]
        public bool Delete(int id)
        {
            GetBusinessLayerProxy(User).DeleteEventCategory(id);
            return true;
           
        }

    }
}