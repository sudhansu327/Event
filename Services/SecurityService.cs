using System.Linq;
using System.Web;
using EventsPromotions.Interfaces;
using EventsPromotions.Models.Security;
using EventsPromotions.Services;

namespace EventsPromotions.Web.Services
{
    public class SecurityService:ISecurityService
    {
        private readonly IUserService _userService;

       public SecurityService()
       {
           _userService = new UserAttributeService();
       }
        public string GetLoggedInUserId()
        {
            var identityName= HttpContext.Current.User.Identity.Name;
            if (!identityName.Contains('\\')) return identityName;
            var name = identityName.Split('\\');
            return name.Length > 0 ? name.Last() : string.Empty;
        }
        public P66UserAttributes CurrentUser
        {
            get { return GetUserInformation(GetLoggedInUserId()); }
        }
        public P66UserAttributes GetUserInformation(string userid)
        {
           return _userService.GetUserAttributes(userid);
           
        }
      
    }
}