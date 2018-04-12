using System.Linq;
using System.Web.Http;
using System.Web.Routing;
using Newtonsoft.Json.Converters;

namespace EventsPromotions.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            RouteTable.Routes.Ignore("api/{*any}");
            RouteTable.Routes.MapPageRoute("HandleAll", "{*url}", "~/index.html");

            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;

            config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(
  new IsoDateTimeConverter() { DateTimeFormat = "MM-dd-yyyy" });
        }
    }
}