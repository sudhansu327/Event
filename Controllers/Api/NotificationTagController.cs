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
    [RoutePrefix(ApiConstants.NotificationTagApiRoute)]
    public class NotificationTagController : ApiController
    {
        private static INotificationTagProxy GetBusinessLayerProxy(IPrincipal userPrincipal)
        {
           var p66Principal = WebIdentity.GetP66Principal(userPrincipal);
            return new NotificationTagProxy(p66Principal);
        }

        [Route(ApiConstants.NotificationTag.GetNotificationTags)]
        public IEnumerable<NotificationTagVm> GetNotificationTags()
        {
            var data = GetBusinessLayerProxy(User).GetNotificationTags();
           
            return data;
        }

    }
}