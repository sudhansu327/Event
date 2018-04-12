using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Principal;
using System.Threading.Tasks;
using EventsPromotions.Models.ViewModels;
using EventsPromotions.Models;
using System.Web.Http;
using EventsPromotions.Interfaces.Proxy;
using EventsPromotions.Proxy;
using EventsPromotions.Services;


namespace EventsPromotions.Web.Controllers.Api
{
    [RoutePrefix(ApiConstants.EventsApiRoute)]
    public class EventController : ApiController

    {
        private static IEventProxy GetBusinessLayerProxy(IPrincipal userPrincipal)
        {
            var p66Principal = WebIdentity.GetP66Principal(userPrincipal);
            return new EventProxy(p66Principal);
        }
        [HttpGet]
        [Route(ApiConstants.Event.GetCalendarEvents)]
        public IList<EventCalendarVm> GetCalendarEvents()
        {
            var data = GetBusinessLayerProxy(User).GetCalendarEvents();
            return data;
        }
        [HttpGet]
        [Route(ApiConstants.Event.GetAllEvents)]
        public IList<EventVm> GetAllEvents()
        {
            var data = GetBusinessLayerProxy(User).GetAllEvents();
            return data;
        }

        [HttpGet]
        [Route(ApiConstants.Event.GetLocationEventsNearMe)]
        public IList<EventVm> GetLocationEvents([FromBody] CurrentLocationVm currentLocation)
        {
            var data = GetBusinessLayerProxy(User).GetLocationEventsNearMe(currentLocation);
            return data;

        }

        [HttpPost]
        [Route(ApiConstants.Event.AddEvent)]
        public EventVm AddEvent([FromBody]EventVm model)
        {
            return GetBusinessLayerProxy(User).AddEvent(model);
        }

        [HttpPut]
        [Route(ApiConstants.Event.UpdateEvent)]
        public EventVm UpdateEvent([FromBody]EventVm model)
        {
            return GetBusinessLayerProxy(User).UpdateEvent(model);
        }

        [HttpDelete]
        [Route(ApiConstants.Event.DeleteEvent + "/{id}")]
        public bool Delete(int id)
        {
            GetBusinessLayerProxy(User).DeleteEvent(id);
            return true;
        }

        [HttpGet]
        [Route(ApiConstants.Event.GetEvent + "/{eventId}")]
        public EventVm GetEvent(int eventId)
        {
            return GetBusinessLayerProxy(User).GetEvent(eventId);
        }
        [HttpGet]
        [Route(ApiConstants.Event.GetEventPromotionCount)]
        public EventPromotionVm GetEventPromotionCount()
        {
            return GetBusinessLayerProxy(User).GetEventPromotionCount();
        }
        [HttpGet]
        [Route(ApiConstants.Event.GetTopThreeEvents)]
        public List<EventVm> GetTopThreeEvents()
        {
            return GetBusinessLayerProxy(User).GetTopThreeEvents();
        }
        [HttpPost]
        [Route("UploadEventAttachment")]
        public async Task<EventImageVm> UploadEventAttachment()
        {
            var provider = new MultipartMemoryStreamProvider();
            try
            {
              
                await Request.Content.ReadAsMultipartAsync(provider);
                {
                   
                    var files = provider.Contents
                        .Where(p => !string.IsNullOrEmpty(p.Headers.ContentDisposition.FileName))
                        .Select(p =>
                            new EventImageVm
                            {
                                ImageName =
                                    p.Headers.ContentDisposition.FileName.Substring(
                                        p.Headers.ContentDisposition.FileName.LastIndexOf("\\", StringComparison.Ordinal) + 1),
                                Image = p.ReadAsByteArrayAsync().Result
                            });
                   
                    var data = new EventImageVm();
                    foreach (var file in files)
                    {
                        if (file != null && file.Image.Length > 0)
                        {
                            var attToSave = new EventImageVm
                            {
                            

                                ImageName = file.ImageName.Replace('"', ' ').Trim(),
                                Image = file.Image
                            };
                         
                            data = attToSave;
                        }
                    }
                   
                    return data;
                  
                }
            }
            catch (Exception)
            {
                
                return new EventImageVm();
            }
        }
    }
}