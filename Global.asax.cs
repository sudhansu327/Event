using System;
using System.Web;
using System.Web.Http;
using EventsPromotions.Services;
using Newtonsoft.Json;

namespace EventsPromotions.Web
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            var exception = Server.GetLastError();
            if (exception == null)
                return;

            var errorLogger = new ErrorLoggerService(HttpContext.Current.User);
            errorLogger.InsertError(exception);

            // Clear the error
            Server.ClearError();

            var errorInformation = new ErrorInformation
            {
                Message = "We apologize but an unexpected error occured.",
                ErrorDate = DateTime.UtcNow
            };

            Response.ClearHeaders();
            Response.ClearContent();
            Response.Status = "500 Internal Server Error";
            Response.StatusCode = 500;
            Response.Write(JsonConvert.SerializeObject(errorInformation));
            Response.Flush();
        }
    }
}