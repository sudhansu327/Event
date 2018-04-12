using System.Collections.Generic;
using System.Web.Http;
using EventsPromotions.Models;
using EventsPromotions.Models.Security;
using EventsPromotions.Proxy;
using EventsPromotions.Web.Services;

namespace EventsPromotions.Web.Controllers.Api
{
    [RoutePrefix(ApiConstants.UserApiRoute)]
    public class UserController : BaseApiController<EventCategoryProxy>

    {
        [HttpGet]
        [Route(ApiConstants.User.GetUser)]
        public P66UserAttributes GetUser()
        {
           // return SecurityService.CurrentUser;
           //using this currently as the above call which was working earlier is failing
            var service=new SecurityService();
            //not using the AD information on the client side, remove for better performance
            var user = service.CurrentUser;
            user.MemberOf = new List<string>();
            return user;
        }

       
    }
}