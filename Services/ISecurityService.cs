

using EventsPromotions.Models.Security;

namespace EventsPromotions.Web.Services
{
 public   interface ISecurityService
 {
     string GetLoggedInUserId();
     P66UserAttributes GetUserInformation(string userid);
     P66UserAttributes CurrentUser { get; }
    }
}
