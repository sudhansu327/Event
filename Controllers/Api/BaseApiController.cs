using System;
using System.Web.Http;
using EventsPromotions.Web.Services;
using System.Web.Mvc;

namespace EventsPromotions.Web.Controllers.Api
{
    public class BaseApiController<T> : ApiController where T : class
    {
        protected readonly ISecurityService SecurityService;

        protected BaseApiController()
        {
            SecurityService = DependencyResolver.Current.GetService<ISecurityService>();
        }

        protected string CurrentUserId { get { return SecurityService.CurrentUser.UserId; } }
        public T ServiceProxy
        {
            get
            {
                return (T)Activator.CreateInstance(
                        typeof(T)
                    );
            }
        }
    }
 
}