using api.Entities;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    public class MailController : BaseApiController
    {
        private readonly IMailService mailService;
        public MailController(IMailService mailService)
        {
            this.mailService = mailService;
        }

        //[HttpPost("send")]
        //public async Task<IActionResult> SendMail([FromForm] MailRequest request)
        //{
        //    try
        //    {
        //        await mailService.SendEmailAsync(request);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //}

        //[HttpPost("welcome")]
        //public async Task<IActionResult> SendWelcomeMail(string fullName, string confirmedEmail, string confirmedUrl)
        //{
        //    try
        //    {
        //        await mailService.SendWelcomeEmailAsync(fullName, confirmedEmail, confirmedUrl);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //}
    }
}
