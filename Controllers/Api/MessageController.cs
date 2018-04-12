using System;
using System.Security.Principal;
using EventsPromotions.Models.ViewModels;
using System.Web.Http;
using EventsPromotions.Interfaces.Proxy;
using EventsPromotions.Models;
using EventsPromotions.Proxy;
using EventsPromotions.Services;
using Newtonsoft.Json;


namespace EventsPromotions.Web.Controllers.Api
{
    [RoutePrefix(ApiConstants.MessageApiRoute)]
    public class MessageController : ApiController
    {
        private static IMessageProxy GetBusinessLayerProxy(IPrincipal userPrincipal)
        {
           var p66Principal = WebIdentity.GetP66Principal(userPrincipal);
            return new MessageProxy(p66Principal);
        }

        [Route(ApiConstants.Message.GetMessages)]
        public MessageViewVm GetMessages()
        {
             return GetBusinessLayerProxy(User).GetMessages();
        }


        [HttpPost]
        [Route(ApiConstants.Message.AddMessage)]
        public PushNotificationVm AddMessage([FromBody]PushNotificationVm model)
        {
            if (!string.IsNullOrEmpty(model.Message.MessageScheduledDateString))
            {
                model.Message.MessageScheduledDate = DateTime.Parse(model.Message.MessageScheduledDateString);
            }

            if (!string.IsNullOrEmpty(model.Message.MessageExpirationDateString))
            {
                model.Message.MessageExpirationDate = DateTime.Parse(model.Message.MessageExpirationDateString);
            }
          
            
            var jsonstring = JsonConvert.SerializeObject(model.Message);
            model.NotificationMessage = jsonstring;
            var data = GetBusinessLayerProxy(User).AddMessage(model);
            var backtoobject = JsonConvert.DeserializeObject<MessageVm>(data.NotificationMessage);
            data.Message = backtoobject;
            return data;
        }

        [HttpPost]
        [Route(ApiConstants.Message.UpdateMessage)]
        public PushNotificationVm UpdateMessage([FromBody]PushNotificationVm model)
        {
            //timestamp isnt coming correctly hence using this conversion
            if (!string.IsNullOrEmpty(model.Message.MessageScheduledDateString))
            {
                model.Message.MessageScheduledDate = DateTime.Parse(model.Message.MessageScheduledDateString);
            }

            if (!string.IsNullOrEmpty(model.Message.MessageExpirationDateString))
            {
                model.Message.MessageExpirationDate = DateTime.Parse(model.Message.MessageExpirationDateString);
            }
            var jsonstring = JsonConvert.SerializeObject(model.Message);
            model.NotificationMessage = jsonstring;
            var data = GetBusinessLayerProxy(User).UpdateMessage(model);
            var backtoobject = JsonConvert.DeserializeObject<MessageVm>(data.NotificationMessage);
            data.Message = backtoobject;
            return data;

        }

        [HttpDelete]
        [Route(ApiConstants.Message.DeleteMessage + "/{id}")]
        public bool DeleteMessage(int id)
        {
            GetBusinessLayerProxy(User).DeleteMessage(id);
            return true;

        }
        [HttpGet]
        [Route(ApiConstants.Message.GetMessageById + "/{msgId}")]
        public PushNotificationVm GetMessageById(int msgId)
        {
            return GetBusinessLayerProxy(User).GetMessageById(msgId);
        }


    }
}